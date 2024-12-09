import { DataSource } from 'typeorm';

import { DependentPrice } from '@entities/dependent-price.entity';
import { Option } from '@entities/option.entity';


export class DependentPriceSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const dependentPriceRepository = dataSource.getRepository(DependentPrice);
        const optionRepository = dataSource.getRepository(Option);

        const redColor = await optionRepository.findOneBy({ name: 'Red' });
        const blackColor = await optionRepository.findOneBy({ name: 'Black' });
        const skateWheelsPremium = await optionRepository.findOneBy({ name: 'Bike Wheels Premium' });
        const skateBootPremium = await optionRepository.findOneBy({ name: 'Boot Premium' });
        const bicycleFramePremium = await optionRepository.findOneBy({ name: 'Frame Premium' });
        const bicycleHandlebarStandard = await optionRepository.findOneBy({ name: 'Handlebar Standard' });
        const bicycleWheelsStandard = await optionRepository.findOneBy({ name: 'Skate Wheels Standard' });

        if (
            !redColor ||
            !blackColor ||
            !skateWheelsPremium ||
            !skateBootPremium ||
            !bicycleFramePremium ||
            !bicycleHandlebarStandard ||
            !bicycleWheelsStandard
        ) {
            throw new Error('One or more options not found. Ensure OptionSeeder has run.');
        }

        const dependentPrices = [
            {
                option: skateWheelsPremium,
                conditionOption: skateBootPremium,
                price: skateWheelsPremium.price + 20,
            },
            {
                option: blackColor,
                conditionOption: skateBootPremium,
                price: blackColor.price + 5,
            },
            {
                option: bicycleFramePremium,
                conditionOption: bicycleHandlebarStandard,
                price: bicycleFramePremium.price * 1.5,
            },
            {
                option: bicycleWheelsStandard,
                conditionOption: redColor,
                price: bicycleWheelsStandard.price + 10,
            },
            // Mixto
            {
                option: redColor,
                conditionOption: skateWheelsPremium,
                price: redColor.price + 15,
            },
            {
                option: blackColor,
                conditionOption: bicycleHandlebarStandard,
                price: blackColor.price * 2,
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

        console.log('Seeded Dependent Prices for Skates and Bicycles');
    }
}
