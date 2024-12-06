import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '@interfaces/api-response.interface';

export const validate: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response: ApiResponse = {
            success: false,
            message: 'Validation failed',
            error: errors.array(),
        };
        console.log('Validation error', errors.array());
        res.status(400).json(response);
        return;
    }
    next();
};
