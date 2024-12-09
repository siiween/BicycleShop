import { DataSource } from 'typeorm';

import { ProductCategory } from '@entities/product-category.entity';

export class ProductCategorySeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const productCategoryRepository = dataSource.getRepository(ProductCategory);

        const categories = [
            {
                name: 'Bicycles',
                description: 'Category for bicycles and related products',
            },
            {
                name: 'Skates',
                description: 'Category for skates and related products',
            },
        ];

        const categoryEntities = categories.map(category => productCategoryRepository.create(category));

        await productCategoryRepository.save(categoryEntities);

        console.log('Seeded Product Categories: Skates and Bicycles');
    }
}
