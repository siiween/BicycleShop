import { AppDataSource } from '@config/data-source';
import { ProductCategory } from '@entities/product-category.entity';
import { Product } from '@entities/product.entity';
import { HttpError } from '@errors/http-error.class';

export class ProductCategoryService {
    static async getAllCategories(): Promise<ProductCategory[]> {
        const categoryRepository = AppDataSource.getRepository(ProductCategory);
        try {
            return await categoryRepository.find();
        } catch (error) {
            throw new HttpError(500, 'Failed to retrieve product categories');
        }
    }

    static async getProductsByCategory(categoryId: number): Promise<Product[]> {
        const categoryRepository = AppDataSource.getRepository(ProductCategory);

        try {
            const category = await categoryRepository.findOne({
                where: { id: categoryId },
                relations: ['products'],
            });

            if (!category) {
                throw new HttpError(404, 'Category not found');
            }

            return category.products;
        } catch (error) {
            throw new HttpError(500, 'Failed to retrieve products for the category');
        }
    }
}
