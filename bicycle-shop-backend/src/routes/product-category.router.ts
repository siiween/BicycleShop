import { Router } from 'express';
import { ProductCategoryController } from '@controllers/product-category.controller';
import { param } from 'express-validator';
import { validate } from '@middlewares/validate.middleware';

const router = Router();

router.get('/', ProductCategoryController.getAll);

router.get(
    '/:id/products',
    param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
    validate,
    ProductCategoryController.getProductsByCategory
);

export default router;
