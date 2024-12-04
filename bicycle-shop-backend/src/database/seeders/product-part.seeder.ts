import { ProductPart } from '@entities/product-part.entity';
import { Product } from '@entities/product.entity';
import { Part } from '@entities/part.entity';
import { DataSource } from 'typeorm';

export class ProductPartSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const productRepository = dataSource.getRepository(Product);
        const partRepository = dataSource.getRepository(Part);
        const productPartRepository = dataSource.getRepository(ProductPart);

        const liteBicycle = await productRepository.findOneBy({ name: 'Lite Bicycle' });
        const proBicycle = await productRepository.findOneBy({ name: 'Pro Bicycle' });

        if (!liteBicycle || !proBicycle) {
            throw new Error('Bicycles not found. Ensure ProductSeeder has run.');
        }

        const liteHandlebar = await partRepository.findOneBy({ name: 'Lite Handlebar' });
        const liteWheels = await partRepository.findOneBy({ name: 'Lite Wheels' });
        const liteFrame = await partRepository.findOneBy({ name: 'Lite Frame' });

        const proHandlebar = await partRepository.findOneBy({ name: 'Pro Handlebar' });
        const proWheels = await partRepository.findOneBy({ name: 'Pro Wheels' });
        const proFrame = await partRepository.findOneBy({ name: 'Pro Frame' });

        const seat = await partRepository.findOneBy({ name: 'Seat' });
        const color = await partRepository.findOneBy({ name: 'Color' });

        if (!liteHandlebar || !liteWheels || !liteFrame || !proHandlebar || !proWheels || !proFrame || !seat || !color) {
            throw new Error('Parts not found. Ensure PartSeeder has run.');
        }

        const productParts = [
            { product: liteBicycle, part: liteHandlebar },
            { product: liteBicycle, part: liteWheels },
            { product: liteBicycle, part: liteFrame },
            { product: liteBicycle, part: seat },
            { product: liteBicycle, part: color },

            { product: proBicycle, part: proHandlebar },
            { product: proBicycle, part: proWheels },
            { product: proBicycle, part: proFrame },
            { product: proBicycle, part: seat },
            { product: proBicycle, part: color },
        ];

        const savedProductParts = productParts.map((pp) => productPartRepository.create(pp));
        await productPartRepository.save(savedProductParts);

        console.log('Seeded ProductParts for Lite and Pro Bicycles');
    }
}
