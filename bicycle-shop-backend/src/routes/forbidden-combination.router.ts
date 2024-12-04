import { Router } from 'express';
import { ForbiddenCombinationController } from '@controllers/forbidden-combination.controller';
import { param, body } from 'express-validator';
import { validate } from '@middlewares/validate.middleware';

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
    '/valid-options',
    validOptions,
    validate,
    ForbiddenCombinationController.getValidOptions
);

export default router;
