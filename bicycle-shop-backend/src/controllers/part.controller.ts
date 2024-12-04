import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '@config/data-source';
import { Part } from '@entities/part.entity';
import { HttpError } from '@errors/http-error.class';
import { ApiResponse } from '@interfaces/api-response.interface';

export class PartController {
    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parts = await AppDataSource.getRepository(Part).find();
            const response: ApiResponse<Part[]> = {
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
            const part = await AppDataSource.getRepository(Part).findOneBy({ id: parseInt(id) });
            if (!part) {
                throw new HttpError(404, 'Part not found');
            }
            const response: ApiResponse<Part> = {
                success: true,
                data: part,
                message: 'Part retrieved successfully',
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    static create = async (req: Request, res: Response, next: NextFunction) => {
        const { name, description } = req.body;
        try {
            const part = new Part();
            part.name = name;
            part.description = description;

            await AppDataSource.getRepository(Part).save(part);

            const response: ApiResponse<Part> = {
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
        const { name, description } = req.body;
        try {
            const part = await AppDataSource.getRepository(Part).findOneBy({ id: parseInt(id) });
            if (!part) {
                throw new HttpError(404, 'Part not found');
            }

            if (name !== undefined) part.name = name;
            if (description !== undefined) part.description = description;

            await AppDataSource.getRepository(Part).save(part);

            const response: ApiResponse<Part> = {
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
            const part = await AppDataSource.getRepository(Part).findOneBy({ id: parseInt(id) });
            if (!part) {
                throw new HttpError(404, 'Part not found');
            }

            await AppDataSource.getRepository(Part).remove(part);

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
