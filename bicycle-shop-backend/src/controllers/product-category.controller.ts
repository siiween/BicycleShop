import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '@config/data-source';
import { ProductCategory } from '@entities/product-category.entity';
import { ApiResponse } from '@interfaces/api-response.interface';

export class ProductCategoryController {

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        const categoryRepository = AppDataSource.getRepository(ProductCategory);
        try {
            const categories = await categoryRepository.find({
                relations: ['products'],
            });
            const response: ApiResponse<ProductCategory[]> = {
                success: true,
                data: categories,
                message: 'Product categories retrieved successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };
}
