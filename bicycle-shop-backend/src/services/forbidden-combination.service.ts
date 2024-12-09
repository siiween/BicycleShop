import { AppDataSource } from '@config/data-source';
import { ForbiddenCombination } from '@database/entities/forbidden-combination.entity';
import { ForbiddenCombinationOption } from '@database/entities/forbidden-combination-option.entity';
import { Option } from '@database/entities/option.entity';
import { HttpError } from '@errors/http-error.class';
import { Product } from '@entities/product.entity';
import { getValidForbiddenCombinations, validateForbiddenCombinations, validatePartsConfiguration, validateStockAndAvailability } from '@utils/forbidden-combination.utils';
import { In } from 'typeorm';

export class ForbiddenCombinationService {

    static async getAllCombinations(): Promise<ForbiddenCombination[]> {
        return AppDataSource.getRepository(ForbiddenCombination).find({
            relations: [
                'forbiddenCombinationOptions',
                'forbiddenCombinationOptions.option',
                'forbiddenCombinationOptions.option.part',
            ],
        });
    }


    static async createCombination(name: string, optionIds: number[]): Promise<ForbiddenCombination> {
        const options = await AppDataSource.getRepository(Option).findByIds(optionIds);
        if (options.length !== optionIds.length) {
            throw new HttpError(404, 'One or more options not found');
        }

        const forbiddenCombination = new ForbiddenCombination();
        forbiddenCombination.name = name;

        const savedCombination = await AppDataSource.getRepository(ForbiddenCombination).save(forbiddenCombination);

        const forbiddenCombinationOptions = options.map((option) => {
            const fco = new ForbiddenCombinationOption();
            fco.forbiddenCombination = savedCombination;
            fco.option = option;
            return fco;
        });

        await AppDataSource.getRepository(ForbiddenCombinationOption).save(forbiddenCombinationOptions);

        return savedCombination;
    }

    static async updateCombination(
        id: number,
        name: string,
        optionIds: number[]
    ): Promise<ForbiddenCombination> {
        const forbiddenCombination = await AppDataSource.getRepository(ForbiddenCombination).findOneBy({ id });

        if (!forbiddenCombination) {
            throw new HttpError(404, 'Forbidden combination not found');
        }

        forbiddenCombination.name = name;

        await AppDataSource.getRepository(ForbiddenCombination).save(forbiddenCombination);

        await AppDataSource.getRepository(ForbiddenCombinationOption).delete({
            forbiddenCombination: { id },
        });

        const options = await AppDataSource.getRepository(Option).findByIds(optionIds);

        const newOptions = options.map((option) => {
            const fco = new ForbiddenCombinationOption();
            fco.forbiddenCombination = forbiddenCombination;
            fco.option = option;
            return fco;
        });

        await AppDataSource.getRepository(ForbiddenCombinationOption).save(newOptions);

        return forbiddenCombination;
    }

    static async deleteCombination(id: number): Promise<void> {
        const forbiddenCombination = await AppDataSource.getRepository(ForbiddenCombination).findOneBy({ id });

        if (!forbiddenCombination) {
            throw new HttpError(404, 'Forbidden combination not found');
        }

        await AppDataSource.getRepository(ForbiddenCombination).remove(forbiddenCombination);
    }
    static async validateSelection(
        selectedOptionIds: number[],
        newOptionId: number
    ): Promise<{ isValid: boolean; conflictingOptions: number[] }> {
        const validCombinations = await getValidForbiddenCombinations();
        const outOfStockOptions = await validateStockAndAvailability([...selectedOptionIds, newOptionId]);

        if (outOfStockOptions.length > 0) {
            return { isValid: false, conflictingOptions: outOfStockOptions };
        }

        const selectedOptionSet = new Set([...selectedOptionIds, newOptionId]);
        const conflictingOptions = validateForbiddenCombinations(validCombinations, selectedOptionSet);

        if (conflictingOptions.length > 0) {
            return { isValid: false, conflictingOptions };
        }

        return { isValid: true, conflictingOptions: [] };
    }


    static async validateProductConfiguration(
        productId: number,
        selectedOptionIds: number[]
    ): Promise<{
        isValid: boolean;
        missingParts: number[];
        invalidOptions: number[];
        conflictingOptions: number[];
    }> {
        const product = await AppDataSource.getRepository(Product).findOne({
            where: { id: productId },
            relations: ['productParts', 'productParts.part', 'productParts.part.options'],
        });

        if (!product) {
            throw new HttpError(404, 'Product not found');
        }

        const { missingParts, invalidOptions } = validatePartsConfiguration(product, new Set(selectedOptionIds));

        if (missingParts.length > 0 || invalidOptions.length > 0) {
            return { isValid: false, missingParts, invalidOptions, conflictingOptions: [] };
        }

        const outOfStockOptions = await validateStockAndAvailability(selectedOptionIds);
        if (outOfStockOptions.length > 0) {
            return { isValid: false, missingParts: [], invalidOptions: [], conflictingOptions: outOfStockOptions };
        }

        const validCombinations = await getValidForbiddenCombinations();
        const conflictingOptions = validateForbiddenCombinations(validCombinations, new Set(selectedOptionIds));

        if (conflictingOptions.length > 0) {
            return { isValid: false, missingParts: [], invalidOptions: [], conflictingOptions };
        }

        return { isValid: true, missingParts: [], invalidOptions: [], conflictingOptions: [] };
    }


    static async processCheckout(
        products: Array<{ productId: number; selectedOptionIds: number[] }>
    ): Promise<{
        success: boolean;
        errors: Array<{
            productId: number;
            missingParts: number[];
            invalidOptions: number[];
            insufficientStock: number[];
        }>;
        totalPrice: number;
    }> {
        const errors: Array<{
            productId: number;
            missingParts: number[];
            invalidOptions: number[];
            insufficientStock: number[];
        }> = [];
        let totalPrice = 0;

        for (const { productId, selectedOptionIds } of products) {
            const product = await AppDataSource.getRepository(Product).findOne({
                where: { id: productId },
                relations: ['productParts', 'productParts.part', 'productParts.part.options'],
            });

            if (!product) {
                errors.push({
                    productId,
                    missingParts: [],
                    invalidOptions: [],
                    insufficientStock: [],
                });
                continue;
            }

            const { missingParts, invalidOptions } = validatePartsConfiguration(
                product,
                new Set(selectedOptionIds)
            );

            if (missingParts.length > 0 || invalidOptions.length > 0) {
                errors.push({
                    productId,
                    missingParts,
                    invalidOptions,
                    insufficientStock: [],
                });
                continue;
            }

            const options = await AppDataSource.getRepository(Option).find({
                where: { id: In(selectedOptionIds) },
                relations: ['dependentPrices', 'dependentPrices.conditionOption'],
            });

            const insufficientStock = options.filter(
                (option) => option.quantity < selectedOptionIds.filter((id) => id === option.id).length
            ).map((option) => option.id);

            if (insufficientStock.length > 0) {
                errors.push({
                    productId,
                    missingParts: [],
                    invalidOptions: [],
                    insufficientStock,
                });
                continue;
            }

            // Calcular el precio total de este producto
            let productPrice = 0;
            const appliedDependencies: Set<number> = new Set();

            options.forEach((option) => {
                const basePrice = Number(option.price);
                let optionPrice = basePrice;

                const applicableDependencies = option.dependentPrices.filter((dependency) =>
                    selectedOptionIds.includes(dependency.conditionOption.id)
                );

                if (applicableDependencies.length > 0 && !appliedDependencies.has(option.id)) {
                    optionPrice = Math.max(
                        ...applicableDependencies.map((dependency) => Number(dependency.price))
                    );
                    appliedDependencies.add(option.id);
                }

                productPrice += optionPrice;
            });

            totalPrice += productPrice;
        }

        if (errors.length > 0) {
            return { success: false, errors, totalPrice: 0 };
        }

        // Actualizar el stock solo si no hay errores
        for (const { selectedOptionIds } of products) {
            for (const optionId of selectedOptionIds) {
                await AppDataSource.getRepository(Option)
                    .createQueryBuilder()
                    .update(Option)
                    .set({ quantity: () => 'quantity - 1' })
                    .where('id = :id', { id: optionId })
                    .execute();
            }
        }

        return { success: true, errors: [], totalPrice };
    }
}
