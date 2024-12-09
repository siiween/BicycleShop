import { DataSource } from 'typeorm';

import { Part } from '@entities/part.entity';


export class PartSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const partRepository = dataSource.getRepository(Part);

        const commonParts = [
            { name: 'Seat', description: 'Universal seat for comfort' },
            { name: 'Color', description: 'Customization for color options' },
        ];

        const skateParts = [
            { name: 'Skate Wheels', description: 'High-quality wheels for Skates' },
            { name: 'Bearings', description: 'Smooth bearings for performance' },
            { name: 'Boot', description: 'Durable boot for Skates' },
        ];

        const bicycleParts = [
            { name: 'Handlebar', description: 'Ergonomic handlebar for Bicycles' },
            { name: 'Bike Wheels', description: 'Durable wheels for Bicycles' },
            { name: 'Frame', description: 'Lightweight frame for Bicycles' },
        ];

        const specificParts = [
            { name: 'Pro Suspension', description: 'Advanced suspension for Pro Bicycle' },
            { name: 'Urban Grip', description: 'Enhanced grip for Urban Skate' },
        ];

        const commonPartEntities = commonParts.map(part => partRepository.create(part));

        const skatePartEntities = skateParts.map(part => partRepository.create({ ...part }));
        const bicyclePartEntities = bicycleParts.map(part => partRepository.create({ ...part }));

        const specificPartEntities = specificParts.map(part => partRepository.create(part));

        await partRepository.save([
            ...commonPartEntities,
            ...skatePartEntities,
            ...bicyclePartEntities,
            ...specificPartEntities,
        ]);

        console.log('Seeded Parts: Common, Skates, Bicycles, and Model-Specific');
    }
}
