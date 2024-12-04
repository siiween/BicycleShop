import { DependentPrice } from '@entities/dependent-price.entity';
import { Option } from '@entities/option.entity';
import { DataSource } from 'typeorm';

export class DependentPriceSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const dependentPriceRepository = dataSource.getRepository(DependentPrice);
        const optionRepository = dataSource.getRepository(Option);

        const redColor = await optionRepository.findOneBy({ name: 'Red' });
        const liteHandlebarPremium = await optionRepository.findOneBy({ name: 'Lite Handlebar Premium' });
        const proHandlebarPremium = await optionRepository.findOneBy({ name: 'Pro Handlebar Premium' });
        const proFramePremium = await optionRepository.findOneBy({ name: 'Pro Frame Premium' });
        const proWheels = await optionRepository.findOneBy({ name: 'Pro Wheels Premium' });

        if (!redColor || !liteHandlebarPremium || !proHandlebarPremium || !proFramePremium || !proWheels) {
            throw new Error('One or more options not found. Ensure OptionSeeder has run.');
        }

        const dependentPrices = [
            {
                option: redColor,
                conditionOption: liteHandlebarPremium,
                price: redColor.price + 10,
            },
            {
                option: redColor,
                conditionOption: proHandlebarPremium,
                price: redColor.price * 3,
            },
            {
                option: proFramePremium,
                conditionOption: proWheels,
                price: proFramePremium.price * 2,
            },
        ];

        const savedDependencies = dependentPrices.map((dp) =>
            dependentPriceRepository.create({
                option: dp.option,
                conditionOption: dp.conditionOption,
                price: dp.price,
            })
        );
        await dependentPriceRepository.save(savedDependencies);

        console.log('Seeded Dependent Prices for specific conditions');
    }
}
