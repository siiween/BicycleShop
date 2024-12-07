import { AppDataSource } from '@config/data-source';
import { Option } from '@database/entities/option.entity';
import { Part } from '@database/entities/part.entity';
import { HttpError } from '@errors/http-error.class';
import { In } from 'typeorm';
import { CalculatePriceResponse, OptionResult } from '@interfaces/option.interface';
import { ForbiddenCombinationOption } from '@entities/forbidden-combination-option.entity';
import { ForbiddenCombination } from '@entities/forbidden-combination.entity';
import { cleanUpForbiddenCombinations } from '@utils/forbidden-combination.utils';
import { DependentPrice } from '@entities/dependent-price.entity';

export class OptionService {


    static async fetchOptionById(id: number): Promise<Option> {
        const option = await AppDataSource.getRepository(Option).findOne({
            where: { id },
            relations: ['part'],
        });
        if (!option) {
            throw new HttpError(404, 'Option not found');
        }
        return option;
    }


    static async createOption(
        partId: number,
        data: {
            name: string;
            description?: string;
            price: number;
            quantity?: number;
            is_available?: boolean;
            image_url?: string;
        }
    ): Promise<Option> {
        const part = await AppDataSource.getRepository(Part).findOneBy({ id: partId });
        if (!part) {
            throw new HttpError(404, 'Part not found');
        }

        const option = new Option();
        option.name = data.name;
        option.description = data.description;
        option.price = data.price;
        option.quantity = data.quantity ?? 0;
        option.is_available = data.is_available ?? true;
        option.image_url = data.image_url;
        option.part = part;

        return await AppDataSource.getRepository(Option).save(option);
    }

    static async updateOption(
        id: number,
        data: {
            name?: string;
            description?: string;
            price?: number;
            quantity?: number;
            is_available?: boolean;
            image_url?: string;
        }
    ): Promise<Option> {
        const option = await AppDataSource.getRepository(Option).findOneBy({ id });
        if (!option) {
            throw new HttpError(404, 'Option not found');
        }

        Object.assign(option, data);

        return await AppDataSource.getRepository(Option).save(option);
    }


    static async deleteOption(id: number): Promise<void> {
        const optionRepository = AppDataSource.getRepository(Option);

        const option = await optionRepository.findOne({
            where: { id },
            relations: ['forbiddenCombinationOptions'],
        });

        if (!option) {
            throw new HttpError(404, 'Option not found');
        }

        await cleanUpForbiddenCombinations(id);

        await optionRepository.remove(option);
    }




    static async calculatePrice(selectedOptionIds: number[]): Promise<CalculatePriceResponse> {
        const options = await AppDataSource.getRepository(Option).find({
            where: { id: In(selectedOptionIds) },
            relations: ['dependentPrices', 'dependentPrices.conditionOption'],
        });

        let total = 0;
        const result: OptionResult[] = [];
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

            total += optionPrice;

            result.push({
                optionId: option.id,
                name: option.name,
                basePrice,
                price: optionPrice,
            });
        });

        return { options: result, total };
    }



    static async fetchDependentPrices(optionId: number): Promise<DependentPrice[]> {
        const dependentPriceRepository = AppDataSource.getRepository(DependentPrice);

        const dependencies = await dependentPriceRepository.find({
            where: [
                { option: { id: optionId } },
            ],
            relations: ['option', 'option.part', 'conditionOption', 'conditionOption.part'],
        });

        return dependencies;
    }
}
