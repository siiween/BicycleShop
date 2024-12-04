import { ForbiddenCombination } from '@entities/forbidden-combination.entity';
import { ForbiddenCombinationOption } from '@entities/forbidden-combination-option.entity';
import { Option } from '@entities/option.entity';
import { DataSource } from 'typeorm';

export class ForbiddenCombinationSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const forbiddenCombinationRepository = dataSource.getRepository(ForbiddenCombination);
        const forbiddenCombinationOptionRepository = dataSource.getRepository(ForbiddenCombinationOption);
        const optionRepository = dataSource.getRepository(Option);

        const liteHandlebarPremium = await optionRepository.findOneBy({ name: 'Lite Handlebar Premium' });
        const liteWheelsPremium = await optionRepository.findOneBy({ name: 'Lite Wheels Premium' });
        const blackColor = await optionRepository.findOneBy({ name: 'Black' });
        const seatPremium = await optionRepository.findOneBy({ name: 'Seat Premium' });
        const whiteColor = await optionRepository.findOneBy({ name: 'White' });

        if (!liteHandlebarPremium || !liteWheelsPremium || !blackColor || !seatPremium || !whiteColor) {
            throw new Error('One or more options not found. Ensure OptionSeeder has run.');
        }

        const forbiddenCombination1 = forbiddenCombinationRepository.create({
            name: 'Lite Premium Handlebar and Lite Premium Wheels -> No Black',
        });
        const savedCombination1 = await forbiddenCombinationRepository.save(forbiddenCombination1);

        const forbiddenOptions1 = [
            { forbiddenCombination: savedCombination1, option: liteHandlebarPremium },
            { forbiddenCombination: savedCombination1, option: liteWheelsPremium },
            { forbiddenCombination: savedCombination1, option: blackColor },
        ];
        await forbiddenCombinationOptionRepository.save(
            forbiddenOptions1.map((fco) => forbiddenCombinationOptionRepository.create(fco))
        );

        const forbiddenCombination2 = forbiddenCombinationRepository.create({
            name: 'Seat Premium -> No White',
        });
        const savedCombination2 = await forbiddenCombinationRepository.save(forbiddenCombination2);

        const forbiddenOptions2 = [
            { forbiddenCombination: savedCombination2, option: seatPremium },
            { forbiddenCombination: savedCombination2, option: whiteColor },
        ];
        await forbiddenCombinationOptionRepository.save(
            forbiddenOptions2.map((fco) => forbiddenCombinationOptionRepository.create(fco))
        );

        console.log('Seeded Forbidden Combinations');
    }
}
