import { Request, Response, NextFunction } from 'express';
import { ForbiddenCombinationService } from '@services/forbidden-combination.service';
import { ApiResponse } from '@interfaces/api-response.interface';

export class ForbiddenCombinationController {
    static createCombination = async (req: Request, res: Response, next: NextFunction) => {
        const { name, optionIds } = req.body;

        try {
            const combination = await ForbiddenCombinationService.createCombination(name, optionIds);

            const response: ApiResponse = {
                success: true,
                data: combination,
                message: 'Forbidden combination created successfully',
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    };

    static updateCombination = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { name, optionIds } = req.body;

        try {
            const combination = await ForbiddenCombinationService.updateCombination(parseInt(id), name, optionIds);

            const response: ApiResponse = {
                success: true,
                data: combination,
                message: 'Forbidden combination updated successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static deleteCombination = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            await ForbiddenCombinationService.deleteCombination(parseInt(id));

            const response: ApiResponse = {
                success: true,
                message: 'Forbidden combination deleted successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static validateSelection = async (req: Request, res: Response, next: NextFunction) => {
        const { selectedOptionIds, newOptionId } = req.body;

        try {
            const isValid = await ForbiddenCombinationService.validateSelection(selectedOptionIds, newOptionId);

            const response: ApiResponse = {
                success: true,
                data: isValid,
                message: isValid ? 'Valid option selection' : 'Invalid option selection',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static getValidOptions = async (req: Request, res: Response, next: NextFunction) => {
        const { selectedOptionIds } = req.body;

        try {
            const validOptions = await ForbiddenCombinationService.getValidOptions(selectedOptionIds);

            const response: ApiResponse = {
                success: true,
                data: validOptions,
                message: 'Valid options retrieved successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    };
}
