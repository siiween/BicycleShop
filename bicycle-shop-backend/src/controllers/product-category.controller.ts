import { Request, Response, NextFunction } from 'express';
import { ProductCategoryService } from '@services/product-category.service';
import { ApiResponse } from '@interfaces/api-response.interface';

export class ProductCategoryController {
    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await ProductCategoryService.getAllCategories();
            const response: ApiResponse = {
                success: true,
                data: categories,
                message: 'Product categories retrieved successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const products = await ProductCategoryService.getProductsByCategory(parseInt(id));
            const response: ApiResponse = {
                success: true,
                data: products,
                message: 'Products for the category retrieved successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };
}
