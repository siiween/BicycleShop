import { AppDataSource } from '@config/data-source';
import { ForbiddenCombination } from '@database/entities/forbidden-combination.entity';
import { ForbiddenCombinationOption } from '@database/entities/forbidden-combination-option.entity';
import { Option } from '@database/entities/option.entity';
import { HttpError } from '@errors/http-error.class';
import { In } from 'typeorm';

export class ForbiddenCombinationService {

    static async getAllCombinations(): Promise<ForbiddenCombination[]> {
        return AppDataSource.getRepository(ForbiddenCombination).find({
            relations: ['forbiddenCombinationOptions', 'forbiddenCombinationOptions.option'],
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
        const forbiddenCombinations = await AppDataSource.getRepository(ForbiddenCombination).find({
            relations: ['forbiddenCombinationOptions', 'forbiddenCombinationOptions.option'],
        });

        const validCombinations = forbiddenCombinations.filter(
            (fc) => fc.forbiddenCombinationOptions.length > 1
        );

        const options = await AppDataSource.getRepository(Option).find({
            where: { id: In([...selectedOptionIds, newOptionId]) },
        });

        const outOfStockOptions = options
            .filter((option) => option.quantity <= 0)
            .map((option) => option.id);

        if (outOfStockOptions.length > 0) {
            return {
                isValid: false,
                conflictingOptions: outOfStockOptions,
            };
        }

        const updatedSelection = new Set([...selectedOptionIds, newOptionId]);

        const conflictingCombination = validCombinations.find((fc) => {
            const forbiddenOptionIds = fc.forbiddenCombinationOptions.map((fco) => fco.option.id);
            return forbiddenOptionIds.every((id) => updatedSelection.has(id));
        });

        if (conflictingCombination) {
            const conflictingOptions = conflictingCombination.forbiddenCombinationOptions.map(
                (fco) => fco.option.id
            );
            return {
                isValid: false,
                conflictingOptions,
            };
        }

        return {
            isValid: true,
            conflictingOptions: [],
        };
    }


    static async getValidOptions(selectedOptionIds: number[]): Promise<Option[]> {
        const allOptions = await AppDataSource.getRepository(Option).find({
            relations: ['part'],
        });

        const forbiddenCombinations = await AppDataSource.getRepository(ForbiddenCombination).find({
            relations: ['forbiddenCombinationOptions', 'forbiddenCombinationOptions.option'],
        });

        return allOptions.filter((option) => {
            return !forbiddenCombinations.some((fc) => {
                const forbiddenOptionIds = fc.forbiddenCombinationOptions.map((fco) => fco.option.id);
                return selectedOptionIds.includes(option.id) && forbiddenOptionIds.includes(option.id);
            });
        });
    }
}
