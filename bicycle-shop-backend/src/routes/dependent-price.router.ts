import { Router } from 'express';
import { DependentPriceController } from '@controllers/dependent-price.controller';
import { body, param } from 'express-validator';
import { validate } from '@middlewares/validate.middleware';

const router = Router();

const dependentPriceBodyValidation = [
    body('optionId').isInt({ gt: 0 }).withMessage('Option ID must be a positive integer'),
    body('conditionOptionId').isInt({ gt: 0 }).withMessage('Condition Option ID must be a positive integer'),
    body('price').isFloat().withMessage('Price must be a valid number'),
];

const dependentPriceIdValidation = [
    param('id').isInt({ gt: 0 }).withMessage('Dependent Price ID must be a positive integer'),
];


router.post('/', dependentPriceBodyValidation, validate, DependentPriceController.createDependency);

router.delete('/:id', dependentPriceIdValidation, validate, DependentPriceController.deleteDependency);

export default router;
