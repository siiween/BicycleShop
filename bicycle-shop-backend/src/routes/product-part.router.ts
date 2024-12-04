import { Router } from 'express';
import { ProductPartController } from '@controllers/product-part.controller';
import { body, param } from 'express-validator';
import { validate } from '@middlewares/validate.middleware';

const router = Router({ mergeParams: true });

router.get(
    '/',
    param('productId').isInt({ gt: 0 }),
    validate,
    ProductPartController.getAllPartsByProduct
);
router.post(
    '/',
    [
        param('productId').isInt({ gt: 0 }),
        body('partId').isInt({ gt: 0 }),
    ],
    validate,
    ProductPartController.associatePartToProduct
);
router.delete(
    '/:partId',
    [
        param('productId').isInt({ gt: 0 }),
        param('partId').isInt({ gt: 0 }),
    ],
    validate,
    ProductPartController.disassociatePartFromProduct
);

export default router;
