import { DataSource } from 'typeorm';

import { ProductPart } from '@entities/product-part.entity';
import { Product } from '@entities/product.entity';
import { Part } from '@entities/part.entity';

export class ProductPartSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const productRepository = dataSource.getRepository(Product);
        const partRepository = dataSource.getRepository(Part);
        const productPartRepository = dataSource.getRepository(ProductPart);

        const skates = await productRepository.find({ where: { category: { name: 'Skates' } } });
        const bicycles = await productRepository.find({ where: { category: { name: 'Bicycles' } } });

        if (!skates.length || !bicycles.length) {
            throw new Error('Products for Skates or Bicycles not found. Ensure ProductSeeder has run.');
        }

        const allParts = await partRepository.find();
        if (!allParts.length) {
            throw new Error('Parts not found. Ensure PartSeeder has run.');
        }

        const commonParts = allParts.filter(part => part.name === 'Seat' || part.name === 'Color');
        const skateParts = allParts.filter(part => ['Skate Wheels', 'Bearings', 'Boot'].includes(part.name));
        const bicycleParts = allParts.filter(part => ['Handlebar', 'Bike Wheels', 'Frame'].includes(part.name));

        const productParts: { product: Product; part: Part; }[] = [];

        skates.forEach(skate => {
            commonParts.forEach(part => productParts.push({ product: skate, part }));
            skateParts.forEach(part => productParts.push({ product: skate, part }));
        });

        bicycles.forEach(bicycle => {
            commonParts.forEach(part => productParts.push({ product: bicycle, part }));
            bicycleParts.forEach(part => productParts.push({ product: bicycle, part }));
        });

        const savedProductParts = productParts.map(pp => productPartRepository.create(pp));
        await productPartRepository.save(savedProductParts);

        console.log('Seeded ProductParts for Skates and Bicycles');
    }
}
