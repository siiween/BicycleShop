import { Router } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@middlewares/validate.middleware';
import { ForbiddenCombinationController } from '@controllers/forbidden-combination.controller';

const router = Router();

const createOrUpdateValidation = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('optionIds')
        .isArray({ min: 1 })
        .withMessage('Option IDs must be a non-empty array'),
    body('optionIds.*')
        .isInt({ gt: 0 })
        .withMessage('Each Option ID must be a positive integer'),
]

const idValidation = [
    param('id')
        .isInt({ gt: 0 })
        .withMessage('ID must be a positive integer'),
]

const validateSelection = [
    body('selectedOptionIds')
        .isArray()
        .withMessage('Selected Option IDs must be an array'),
    body('selectedOptionIds.*')
        .isInt({ gt: 0 })
        .withMessage('Each Selected Option ID must be a positive integer'),
    body('newOptionId')
        .isInt({ gt: 0 })
        .withMessage('New Option ID must be a positive integer'),
]

const validOptions = [
    body('selectedOptionIds')
        .isArray()
        .withMessage('Selected Option IDs must be an array'),
    body('selectedOptionIds.*')
        .isInt({ gt: 0 })
        .withMessage('Each Selected Option ID must be a positive integer'),
]

router.get(
    '/',
    ForbiddenCombinationController.getAllCombinations
);

router.post(
    '/',
    createOrUpdateValidation,
    validate,
    ForbiddenCombinationController.createCombination
);

router.put(
    '/:id',
    [
        ...idValidation,
        ...createOrUpdateValidation,
    ],
    validate,
    ForbiddenCombinationController.updateCombination
);

router.delete(
    '/:id',
    idValidation,
    validate,
    ForbiddenCombinationController.deleteCombination
);

router.post(
    '/validate',
    validateSelection,
    validate,
    ForbiddenCombinationController.validateSelection
);


router.post(
    '/validate-product-configuration/:id',
    [...idValidation, ...validOptions],
    validate,
    ForbiddenCombinationController.validateProductConfiguration
);


router.post(
    '/checkout',
    [
        body('products')
            .isArray({ min: 1 })
            .withMessage('Products must be a non-empty array'),
        body('products.*.productId')
            .isInt({ gt: 0 })
            .withMessage('Product ID must be a positive integer'),
        body('products.*.selectedOptionIds')
            .isArray()
            .withMessage('Selected Option IDs must be an array'),
        body('products.*.selectedOptionIds.*')
            .isInt({ gt: 0 })
            .withMessage('Each Selected Option ID must be a positive integer'),
    ],
    validate,
    ForbiddenCombinationController.checkout
);



export default router;
