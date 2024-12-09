import { Router } from 'express';
import { ProductController } from '@controllers/product.controller';
import { body, param } from 'express-validator';
import { validate } from '@middlewares/validate.middleware';
import { upload } from '@middlewares/upload.middleware';
import productPartRouter from '@routes/product-part.router';

const router = Router();

const productValidation = [
    body('name')
        .optional()
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),
    body('is_active')
        .optional()
        .isBoolean().withMessage('is_active must be a boolean'),
    body('category_id')
        .optional()
        .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),

];


const idValidation = [
    param('id')
        .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
];

router.get('/', ProductController.getAll);

router.get(
    '/:id',
    ...idValidation,
    validate,
    ProductController.getById
);

router.post(
    '/',
    upload.single('image'),
    [
        body('name')
            .isString().withMessage('Name must be a string')
            .notEmpty().withMessage('Name is required'),
        body('category_id')
            .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),
        ...productValidation
    ],
    validate,
    ProductController.create
);

router.put(
    '/:id',
    upload.single('image'),
    [
        ...idValidation,
        ...productValidation,
    ],
    validate,
    ProductController.update
);

router.delete(
    '/:id',
    ...idValidation,
    validate,
    ProductController.delete
);

router.use('/:productId/parts', productPartRouter);

export default router;
