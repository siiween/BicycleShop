import { Router } from 'express';
import { ProductCategoryController } from '@controllers/product-category.controller';

const router = Router();

router.get('/', ProductCategoryController.getAll);

export default router;
