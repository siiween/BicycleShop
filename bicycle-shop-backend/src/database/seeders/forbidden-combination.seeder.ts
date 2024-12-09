import { DataSource } from 'typeorm';

import { ForbiddenCombination } from '@entities/forbidden-combination.entity';
import { ForbiddenCombinationOption } from '@entities/forbidden-combination-option.entity';
import { Option } from '@entities/option.entity';

export class ForbiddenCombinationSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const forbiddenCombinationRepository = dataSource.getRepository(ForbiddenCombination);
        const forbiddenCombinationOptionRepository = dataSource.getRepository(ForbiddenCombinationOption);
        const optionRepository = dataSource.getRepository(Option);

        const options = await optionRepository.find({ relations: ['part'] });
        if (!options.length) {
            throw new Error('No options found. Ensure OptionSeeder has run.');
        }

        const findOption = (name: string): Option | undefined => options.find(option => option.name === name);

        const handlebarPremium = findOption('Handlebar Premium');
        const frameStandard = findOption('Frame Standard');
        const redColor = findOption('Red');
        const wheelsPremium = findOption('Skate Wheels Premium');
        const bootStandard = findOption('Boot Standard');
        const blackColor = findOption('Black');
        const seatPremium = findOption('Seat Premium');
        const whiteColor = findOption('White');
        const bearingsStandard = findOption('Bearings Standard');
        const urbanGrip = findOption('Urban Grip Premium');

        if (
            !handlebarPremium ||
            !frameStandard ||
            !redColor ||
            !wheelsPremium ||
            !bootStandard ||
            !blackColor ||
            !seatPremium ||
            !whiteColor ||
            !bearingsStandard
        ) {
            throw new Error('One or more options not found. Ensure OptionSeeder has run.');
        }

        const forbiddenCombinations = [
            {
                name: 'Handlebar Premium and Frame Standard cannot be combined with Red Color',
                options: [handlebarPremium, frameStandard, redColor],
            },
            {
                name: 'Wheels Premium and Boot Standard cannot be combined with Black Color',
                options: [wheelsPremium, bootStandard, blackColor],
            },
            {
                name: 'Seat Premium cannot be combined with White Color',
                options: [seatPremium, whiteColor],
            },
            {
                name: 'Bearings Standard cannot be combined with Wheels Premium',
                options: [bearingsStandard, wheelsPremium],
            },
            {
                name: 'Boot Standard and Urban Grip Premium cannot be combined',
                options: [bootStandard, urbanGrip],
            },
        ];

        for (const combination of forbiddenCombinations) {
            const forbiddenCombination = forbiddenCombinationRepository.create({
                name: combination.name,
            });
            const savedCombination = await forbiddenCombinationRepository.save(forbiddenCombination);

            const forbiddenOptions = combination.options.map(option => ({
                forbiddenCombination: savedCombination,
                option,
            }));

            await forbiddenCombinationOptionRepository.save(
                forbiddenOptions.map(fco => forbiddenCombinationOptionRepository.create(fco))
            );
        }

        console.log('Seeded Forbidden Combinations with updated options for Bikes and Skates');
    }
}
