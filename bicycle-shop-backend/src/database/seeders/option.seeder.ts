import { Option } from '@entities/option.entity';
import { Part } from '@entities/part.entity';
import { DataSource } from 'typeorm';

export class OptionSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const partRepository = dataSource.getRepository(Part);
        const optionRepository = dataSource.getRepository(Option);

        const parts = await partRepository.find();
        if (parts.length === 0) {
            throw new Error('No parts found. Ensure PartSeeder has run.');
        }

        const getRandom = (): number => Math.floor(Math.random() * 6);

        const optionsData = parts.map((part) => {
            if (part.name === 'Color') {
                return [
                    { name: 'White', description: 'Classic white color', price: 0, quantity: getRandom(), is_available: true, part },
                    { name: 'Black', description: 'Elegant black color', price: 10, quantity: getRandom(), is_available: true, part },
                    { name: 'Red', description: 'Sporty red color', price: 15, quantity: getRandom(), is_available: true, part },
                ];
            } else {
                return [
                    { name: `${part.name} Standard`, description: `Standard version of ${part.name.toLowerCase()}`, price: 50, quantity: getRandom(), is_available: true, part },
                    { name: `${part.name} Premium`, description: `Premium version of ${part.name.toLowerCase()}`, price: 100, quantity: getRandom(), is_available: true, part },
                ];
            }
        });

        const options = optionsData.flat().map((option) => optionRepository.create(option));
        await optionRepository.save(options);

        console.log('Seeded Options with random stock for all parts, including colors');
    }
}
