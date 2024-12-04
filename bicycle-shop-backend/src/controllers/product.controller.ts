import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '@config/data-source';
import { Product } from '@entities/product.entity';
import { ProductCategory } from '@entities/product-category.entity';
import { ApiResponse } from '@interfaces/api-response.interface';
import { HttpError } from '@errors/http-error.class';


export class ProductController {

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        const productRepository = AppDataSource.getRepository(Product);
        try {
            const products = await productRepository.find({
                relations: ['category'],
            });
            const response: ApiResponse<Product[]> = {
                success: true,
                data: products,
                message: 'Products retrieved successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };


    static getById = async (req: Request, res: Response, next: NextFunction) => {
        const productRepository = AppDataSource.getRepository(Product);
        const { id } = req.params;
        try {
            const product = await productRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['category'],
            });
            if (product) {
                const response: ApiResponse<Product> = {
                    success: true,
                    data: product,
                    message: 'Product retrieved successfully',
                };
                res.json(response);
            } else {
                throw new HttpError(404, 'Product not found');
            }
        } catch (error) {
            next(error);
        }
    };


    static create = async (req: Request, res: Response, next: NextFunction) => {
        const productRepository = AppDataSource.getRepository(Product);
        const { name, description, is_active, category_id } = req.body;

        try {
            const category = await AppDataSource.getRepository(ProductCategory).findOneBy({ id: category_id });
            if (!category) {
                throw new HttpError(404, 'Category not found');
            }

            const product = new Product();
            product.name = name;
            product.description = description;
            product.is_active = is_active !== undefined ? is_active : true;
            product.category = category;

            await productRepository.save(product);

            const response: ApiResponse<Product> = {
                success: true,
                data: product,
                message: 'Product created successfully',
            };
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    };


    static update = async (req: Request, res: Response, next: NextFunction) => {
        const productRepository = AppDataSource.getRepository(Product);
        const { id } = req.params;
        const { name, description, is_active, category_id } = req.body;

        try {
            const product = await productRepository.findOneBy({ id: parseInt(id) });
            if (!product) {
                throw new HttpError(404, 'Product not found');
            }

            if (category_id !== undefined) {
                const category = await AppDataSource.getRepository(ProductCategory).findOneBy({ id: category_id });
                if (!category) {
                    throw new HttpError(404, 'Category not found');
                }
                product.category = category;
            }

            product.name = name !== undefined ? name : product.name;
            product.description = description !== undefined ? description : product.description;
            product.is_active = is_active !== undefined ? is_active : product.is_active;

            await productRepository.save(product);

            const response: ApiResponse<Product> = {
                success: true,
                data: product,
                message: 'Product updated successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        const productRepository = AppDataSource.getRepository(Product);
        const { id } = req.params;

        try {
            const product = await productRepository.findOneBy({ id: parseInt(id) });
            if (!product) {
                throw new HttpError(404, 'Product not found');
            }

            await productRepository.remove(product);

            const response: ApiResponse = {
                success: true,
                message: 'Product deleted successfully',
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}
