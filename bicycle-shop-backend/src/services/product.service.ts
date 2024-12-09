import { AppDataSource } from '@config/data-source';
import { Product } from '@entities/product.entity';
import { ProductCategory } from '@entities/product-category.entity';
import { HttpError } from '@errors/http-error.class';

export class ProductService {
    static async getAllProducts(): Promise<Product[]> {
        const productRepository = AppDataSource.getRepository(Product);
        try {
            return await productRepository.find({
                relations: ['category'],
            });
        } catch (error) {
            throw new HttpError(500, 'Failed to retrieve products');
        }
    }

    static async getProductById(id: number): Promise<Product> {
        const productRepository = AppDataSource.getRepository(Product);
        try {
            const product = await productRepository.findOne({
                where: { id },
                relations: ['category'],
            });
            if (!product) {
                throw new HttpError(404, 'Product not found');
            }
            return product;
        } catch (error) {
            throw new HttpError(500, 'Failed to retrieve product');
        }
    }

    static async createProduct(
        data: { name: string; description?: string; is_active?: boolean; category_id: number },
        imageUrl?: string
    ): Promise<Product> {
        const productRepository = AppDataSource.getRepository(Product);
        const categoryRepository = AppDataSource.getRepository(ProductCategory);

        try {
            const { name, description, is_active, category_id } = data;

            const category = await categoryRepository.findOneBy({ id: category_id });
            if (!category) {
                throw new HttpError(404, 'Category not found');
            }



            const product = new Product();
            product.name = name;
            product.description = description;
            product.is_active = is_active !== undefined ? is_active : true;
            product.category = category;
            product.image_url = imageUrl;

            return await productRepository.save(product);
        } catch (error) {
            throw new HttpError(500, 'Failed to create product');
        }
    }

    static async updateProduct(
        id: number,
        data: { name?: string; description?: string; is_active?: boolean; category_id?: number },
        imageUrl?: string
    ): Promise<Product> {
        const productRepository = AppDataSource.getRepository(Product);
        const categoryRepository = AppDataSource.getRepository(ProductCategory);

        try {
            const product = await productRepository.findOneBy({ id });
            if (!product) {
                throw new HttpError(404, 'Product not found');
            }

            if (data.category_id !== undefined) {
                const category = await categoryRepository.findOneBy({ id: data.category_id });
                if (!category) {
                    throw new HttpError(404, 'Category not found');
                }
                product.category = category;
            }

            product.name = data.name !== undefined ? data.name : product.name;
            product.description = data.description !== undefined ? data.description : product.description;
            product.is_active = data.is_active !== undefined ? data.is_active : product.is_active;
            product.image_url = imageUrl ?? product.image_url;

            return await productRepository.save(product);
        } catch (error) {
            throw new HttpError(500, 'Failed to update product');
        }
    }

    static async deleteProduct(id: number): Promise<void> {
        const productRepository = AppDataSource.getRepository(Product);

        try {
            const product = await productRepository.findOneBy({ id });
            if (!product) {
                throw new HttpError(404, 'Product not found');
            }

            await productRepository.remove(product);
        } catch (error) {
            throw new HttpError(500, 'Failed to delete product');
        }
    }
}
