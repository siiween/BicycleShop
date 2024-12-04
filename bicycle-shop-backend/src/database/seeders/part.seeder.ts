import { Part } from '@entities/part.entity';
import { DataSource } from 'typeorm';

export class PartSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const partRepository = dataSource.getRepository(Part);

        const liteParts = [
            { name: 'Lite Handlebar', description: 'Handlebar designed for Lite Bicycle' },
            { name: 'Lite Wheels', description: 'Wheels designed for Lite Bicycle' },
            { name: 'Lite Frame', description: 'Frame designed for Lite Bicycle' },
        ];

        const proParts = [
            { name: 'Pro Handlebar', description: 'Handlebar designed for Pro Bicycle' },
            { name: 'Pro Wheels', description: 'Wheels designed for Pro Bicycle' },
            { name: 'Pro Frame', description: 'Frame designed for Pro Bicycle' },
        ];

        const sharedParts = [
            { name: 'Seat', description: 'Comfortable seat for all bicycles' },
            { name: 'Color', description: 'Bicycle color' },
        ];

        const allParts = [...liteParts, ...proParts, ...sharedParts];
        const savedParts = allParts.map((part) => partRepository.create(part));
        await partRepository.save(savedParts);

        console.log('Seeded Parts: Lite, Pro, and Shared Parts');
    }
}
