import { Request, Response, NextFunction } from 'express';
import { ForbiddenCombinationService } from '@services/forbidden-combination.service';
import { ApiResponse } from '@interfaces/api-response.interface';

export class ForbiddenCombinationController {
    static getAllCombinations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const combinations = await ForbiddenCombinationService.getAllCombinations();

            const response: ApiResponse = {
                success: true,
                data: combinations,
                message: 'Forbidden combinations retrieved successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    };


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


    static validateProductConfiguration = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { selectedOptionIds } = req.body;

        try {
            const validationResult = await ForbiddenCombinationService.validateProductConfiguration(
                parseInt(id, 10),
                selectedOptionIds
            );

            const response: ApiResponse = {
                success: validationResult.isValid,
                data: validationResult,
                message: validationResult.isValid
                    ? 'Product configuration is valid'
                    : 'Product configuration is invalid',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    };

}
