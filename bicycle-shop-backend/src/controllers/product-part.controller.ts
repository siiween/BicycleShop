// src/controllers/product-part.controller.ts

import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '@config/data-source';
import { ProductPart } from '@entities/product-part.entity';
import { Product } from '@entities/product.entity';
import { Part } from '@entities/part.entity';
import { HttpError } from '@errors/http-error.class';
import { ApiResponse } from '@interfaces/api-response.interface';

export class ProductPartController {
    static getAllPartsByProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { productId } = req.params;
        try {
            const product = await AppDataSource.getRepository(Product).findOne({
                where: { id: parseInt(productId) },
                relations: ['productParts', 'productParts.part'],
            });
            if (!product) {
                throw new HttpError(404, 'Product not found');
            }

            const response: ApiResponse = {
                success: true,
                data: product.productParts.map((pp) => pp.part),
                message: 'Parts retrieved successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static associatePartToProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { productId } = req.params;
        const { partId } = req.body;
        try {
            const product = await AppDataSource.getRepository(Product).findOneBy({
                id: parseInt(productId),
            });
            if (!product) {
                throw new HttpError(404, 'Product not found');
            }

            const part = await AppDataSource.getRepository(Part).findOneBy({ id: parseInt(partId) });
            if (!part) {
                throw new HttpError(404, 'Part not found');
            }

            const productPart = new ProductPart();
            productPart.product = product;
            productPart.part = part;

            await AppDataSource.getRepository(ProductPart).save(productPart);

            const response: ApiResponse = {
                success: true,
                data: productPart,
                message: 'Part associated with product successfully',
            };
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    };

    static disassociatePartFromProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { productId, partId } = req.params;
        try {
            const productPart = await AppDataSource.getRepository(ProductPart).findOne({
                where: {
                    product: { id: parseInt(productId) },
                    part: { id: parseInt(partId) },
                },
            });

            if (!productPart) {
                throw new HttpError(404, 'Association not found');
            }

            await AppDataSource.getRepository(ProductPart).remove(productPart);

            const response: ApiResponse = {
                success: true,
                message: 'Part disassociated from product successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };
}
