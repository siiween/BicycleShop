import { Request, Response, NextFunction } from 'express';
import { ProductPartService } from '@services/product-part.service';
import { ApiResponse } from '@interfaces/api-response.interface';

export class ProductPartController {
    static getAllPartsByProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { productId } = req.params;
        try {
            const parts = await ProductPartService.getAllPartsByProduct(parseInt(productId));
            const response: ApiResponse = {
                success: true,
                data: parts,
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
            const productPart = await ProductPartService.associatePartToProduct(
                parseInt(productId),
                parseInt(partId)
            );
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
            await ProductPartService.disassociatePartFromProduct(parseInt(productId), parseInt(partId));
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
