import { Request, Response, NextFunction } from 'express';
import { DependentPriceService } from '@services/dependent-price.service';
import { ApiResponse } from '@interfaces/api-response.interface';

export class DependentPriceController {
    static createDependency = async (req: Request, res: Response, next: NextFunction) => {
        const { optionId, conditionOptionId, price } = req.body;

        try {
            const dependency = await DependentPriceService.createDependency(
                parseInt(optionId),
                parseInt(conditionOptionId),
                parseFloat(price)
            );

            const response: ApiResponse = {
                success: true,
                data: dependency,
                message: 'Dependency created successfully',
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    };

    static deleteDependency = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            await DependentPriceService.deleteDependency(parseInt(id));

            const response: ApiResponse = {
                success: true,
                message: 'Dependency deleted successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    };
}
