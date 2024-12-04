import { Request, Response, NextFunction } from 'express';
import { OptionService } from '@services/option.service';
import { ApiResponse } from '@interfaces/api-response.interface';

export class OptionController {
    static createOption = async (req: Request, res: Response, next: NextFunction) => {
        const { partId } = req.params;
        try {
            const option = await OptionService.createOption(parseInt(partId), req.body);
            const response: ApiResponse = {
                success: true,
                data: option,
                message: 'Option created successfully',
            };
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    };

    static updateOption = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const option = await OptionService.updateOption(parseInt(id), req.body);
            const response: ApiResponse = {
                success: true,
                data: option,
                message: 'Option updated successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static deleteOption = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            await OptionService.deleteOption(parseInt(id));
            const response: ApiResponse = {
                success: true,
                message: 'Option deleted successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static calculatePrice = async (req: Request, res: Response, next: NextFunction) => {
        const { selectedOptionIds } = req.body;
        try {
            const result = await OptionService.calculatePrice(selectedOptionIds);
            const response: ApiResponse = {
                success: true,
                data: result,
                message: 'Prices calculated successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };
}
