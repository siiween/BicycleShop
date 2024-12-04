import { Request, Response, NextFunction } from 'express';
import { PartService } from '@services/part.service';
import { ApiResponse } from '@interfaces/api-response.interface';

export class PartController {
    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parts = await PartService.getAllParts();
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

    static getById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const part = await PartService.getPartById(parseInt(id));
            const response: ApiResponse = {
                success: true,
                data: part,
                message: 'Part retrieved successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static getOptionsByPart = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const options = await PartService.getOptionsByPart(parseInt(id));
            const response: ApiResponse = {
                success: true,
                data: options,
                message: 'Options for part retrieved successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const part = await PartService.createPart(req.body);
            const response: ApiResponse = {
                success: true,
                data: part,
                message: 'Part created successfully',
            };
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    };

    static update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const part = await PartService.updatePart(parseInt(id), req.body);
            const response: ApiResponse = {
                success: true,
                data: part,
                message: 'Part updated successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            await PartService.deletePart(parseInt(id));
            const response: ApiResponse = {
                success: true,
                message: 'Part deleted successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };
}
