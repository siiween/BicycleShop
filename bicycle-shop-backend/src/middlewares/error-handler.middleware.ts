import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@interfaces/api-response.interface';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Unhandled error:', err);

    const statusCode = err.statusCode || 500;
    const response: ApiResponse = {
        success: false,
        message: err.message || 'An unexpected error occurred',
        error: err.error || err,
    };

    res.status(statusCode).json(response);
};
