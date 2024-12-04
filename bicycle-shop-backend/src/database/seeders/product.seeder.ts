import { Product } from '@entities/product.entity';
import { ProductCategory } from '@entities/product-category.entity';
import { DataSource } from 'typeorm';

export class ProductSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const productRepository = dataSource.getRepository(Product);
        const productCategoryRepository = dataSource.getRepository(ProductCategory);

        const bicycleCategory = await productCategoryRepository.findOne({
            where: { name: 'Bicycle' },
        });

        if (!bicycleCategory) {
            throw new Error('Bicycle category not found. Ensure ProductCategorySeeder has run.');
        }

        const liteBicycle = productRepository.create({
            name: 'Lite Bicycle',
            description: 'An affordable bicycle for casual riders.',
            is_active: true,
            category: bicycleCategory,
        });

        const proBicycle = productRepository.create({
            name: 'Pro Bicycle',
            description: 'A high-end bicycle for professional riders.',
            is_active: true,
            category: bicycleCategory,
        });

        await productRepository.save([liteBicycle, proBicycle]);

        console.log('Seeded Products: Lite Bicycle and Pro Bicycle');
    }
}
