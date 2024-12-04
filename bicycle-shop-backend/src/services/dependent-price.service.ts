import { AppDataSource } from '@config/data-source';
import { DependentPrice } from '@database/entities/dependent-price.entity';
import { Option } from '@database/entities/option.entity';
import { HttpError } from '@errors/http-error.class';

export class DependentPriceService {
    static async createDependency(optionId: number, conditionOptionId: number, price: number): Promise<DependentPrice> {
        if (optionId === conditionOptionId) {
            throw new HttpError(400, 'Option and Condition Option cannot be the same');
        }

        const existingDependency = await AppDataSource.getRepository(DependentPrice).findOne({
            where: {
                option: { id: optionId },
                conditionOption: { id: conditionOptionId },
            },
        });

        if (existingDependency) {
            throw new HttpError(400, 'A dependency with the same Option and Condition Option already exists');
        }

        const option = await AppDataSource.getRepository(Option).findOneBy({ id: optionId });
        const conditionOption = await AppDataSource.getRepository(Option).findOneBy({ id: conditionOptionId });

        if (!option || !conditionOption) {
            throw new HttpError(404, 'Option or Condition Option not found');
        }

        const dependency = new DependentPrice();
        dependency.option = option;
        dependency.conditionOption = conditionOption;
        dependency.price = price;

        return await AppDataSource.getRepository(DependentPrice).save(dependency);
    }

    static async deleteDependency(id: number): Promise<void> {
        const dependency = await AppDataSource.getRepository(DependentPrice).findOneBy({ id });

        if (!dependency) {
            throw new HttpError(404, 'Dependency not found');
        }

        await AppDataSource.getRepository(DependentPrice).remove(dependency);
    }
}
