import { Request, Response, NextFunction } from 'express';
import { ProductService } from '@services/product.service';
import { ApiResponse } from '@interfaces/api-response.interface';
import { uploadImage } from '@utils/upload-image.util';
export class ProductController {
    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await ProductService.getAllProducts();
            const response: ApiResponse = {
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
        const { id } = req.params;
        try {
            const product = await ProductService.getProductById(parseInt(id));
            const response: ApiResponse = {
                success: true,
                data: product,
                message: 'Product retrieved successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static create = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { file } = req;
            const imageUrl = file ? await uploadImage(file) : `${process.env.BACKEND_URL ?? "http://localhost"}:${process.env.PORT}/uploads/default.png`;

            const product = await ProductService.createProduct({ ...req.body }, imageUrl);

            const response: ApiResponse = {
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
        const { id } = req.params;
        try {
            const { file } = req;
            const imageUrl = file ? await uploadImage(file) : undefined;

            console.log(imageUrl, req.body)
            const product = await ProductService.updateProduct(parseInt(id), { ...req.body }, imageUrl);

            const response: ApiResponse = {
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
        const { id } = req.params;
        try {
            await ProductService.deleteProduct(parseInt(id));
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
