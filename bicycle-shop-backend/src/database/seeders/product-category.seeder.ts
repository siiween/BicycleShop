import { ProductCategory } from '@entities/product-category.entity';
import { DataSource } from 'typeorm';

export class ProductCategorySeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const productCategoryRepository = dataSource.getRepository(ProductCategory);

        const bicycleCategory = productCategoryRepository.create({
            name: 'Bicycle',
            description: 'Category for bicycles and related products',
        });

        await productCategoryRepository.save(bicycleCategory);

        console.log('Seeded ProductCategory: bicycle');
    }
}
