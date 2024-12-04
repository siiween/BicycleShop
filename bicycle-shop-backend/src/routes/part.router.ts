import { Router } from 'express';
import { PartController } from '@controllers/part.controller';
import { body, param } from 'express-validator';
import { validate } from '@middlewares/validate.middleware';

const router = Router();

router.get('/', PartController.getAll);

router.get('/:id', param('id').isInt({ gt: 0 }), validate, PartController.getById);

router.get(
    '/:id/options',
    param('id').isInt({ gt: 0 }),
    validate,
    PartController.getOptionsByPart
);

router.post(
    '/',
    body('name').isString().notEmpty(),
    validate,
    PartController.create
);

router.put(
    '/:id',
    [param('id').isInt({ gt: 0 }), body('name').optional()],
    validate,
    PartController.update
);

router.delete('/:id', param('id').isInt({ gt: 0 }), validate, PartController.delete);

export default router;
