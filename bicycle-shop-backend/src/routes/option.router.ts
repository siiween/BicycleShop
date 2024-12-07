import { Router } from 'express';
import { OptionController } from '@controllers/option.controller';
import { body, param } from 'express-validator';
import { validate } from '@middlewares/validate.middleware';
import forbiddenCombinationRouter from '@routes/forbidden-combination.router';


const router = Router({ mergeParams: true });

const partIdValidation = [
    param('partId').isInt({ gt: 0 }).withMessage('Part ID must be a positive integer'),
];

const optionIdValidation = [
    param('id').isInt({ gt: 0 }).withMessage('Option ID must be a positive integer'),
];

const optionBodyValidation = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    body('is_available').optional().isBoolean().withMessage('Availability must be a boolean'),
    body('image_url').optional().isURL().withMessage('Image URL must be a valid URL'),
];

router.post(
    '/:partId',
    [
        ...partIdValidation,
        body('name').notEmpty().withMessage('Name is required'),
        body('price').notEmpty().withMessage('Price is required'),
        ...optionBodyValidation,
    ],
    validate,
    OptionController.createOption
);

router.put(
    '/:id',
    [...optionIdValidation, ...optionBodyValidation],
    validate,
    OptionController.updateOption
);

router.delete(
    '/:id',
    optionIdValidation,
    validate,
    OptionController.deleteOption
);

router.post(
    '/price/calculate',
    [
        body('selectedOptionIds')
            .isArray({ min: 1 })
            .withMessage('Must provide a non-empty array of selected option IDs'),
        body('selectedOptionIds.*')
            .isInt({ gt: 0 })
            .withMessage('Each option ID must be a positive integer'),
    ],
    validate,
    OptionController.calculatePrice
);


router.use('/forbidden-combinations', forbiddenCombinationRouter);


export default router;
