import { AppDataSource } from '@config/data-source';
import { ForbiddenCombination } from '@entities/forbidden-combination.entity';
import { ForbiddenCombinationOption } from '@entities/forbidden-combination-option.entity';
import { Product } from '@entities/product.entity';
import { Option } from '@entities/option.entity';
import { In } from 'typeorm';


export async function cleanUpForbiddenCombinations(relatedEntityId: number): Promise<void> {
    const forbiddenCombinationRepository = AppDataSource.getRepository(ForbiddenCombination);
    const forbiddenCombinationOptionRepository = AppDataSource.getRepository(ForbiddenCombinationOption);

    const forbiddenCombinationOptions = await forbiddenCombinationOptionRepository.find({
        where: { option: { id: relatedEntityId } },
        relations: ['forbiddenCombination'],
    });

    const relatedForbiddenCombinations = new Set(
        forbiddenCombinationOptions.map((fco) => fco.forbiddenCombination.id)
    );

    await Promise.all(
        Array.from(relatedForbiddenCombinations).map(async (combinationId) => {
            const forbiddenCombination = await forbiddenCombinationRepository.findOne({
                where: { id: combinationId },
                relations: ['forbiddenCombinationOptions'],
            });

            if (forbiddenCombination) {
                await forbiddenCombinationRepository.remove(forbiddenCombination);
            }
        })
    );
}


export async function getValidForbiddenCombinations() {
    const forbiddenCombinations = await AppDataSource.getRepository(ForbiddenCombination).find({
        relations: ['forbiddenCombinationOptions', 'forbiddenCombinationOptions.option'],
    });

    return forbiddenCombinations.filter((fc) => fc.forbiddenCombinationOptions.length > 1);
}

export async function validateStockAndAvailability(optionIds: number[]): Promise<number[]> {
    const options = await AppDataSource.getRepository(Option).find({
        where: { id: In(optionIds) },
    });

    return options
        .filter((option) => option.quantity <= 0 || !option.is_available)
        .map((option) => option.id);
}

export function validateForbiddenCombinations(
    validCombinations: ForbiddenCombination[],
    selectedOptionSet: Set<number>
): number[] {
    const conflictingCombination = validCombinations.find((fc) => {
        const forbiddenOptionIds = fc.forbiddenCombinationOptions.map((fco) => fco.option.id);
        return forbiddenOptionIds.every((id) => selectedOptionSet.has(id));
    });

    if (conflictingCombination) {
        return conflictingCombination.forbiddenCombinationOptions.map((fco) => fco.option.id);
    }

    return [];
}

export function validatePartsConfiguration(
    product: Product,
    selectedOptionSet: Set<number>
): { missingParts: number[]; invalidOptions: number[] } {
    const missingParts: number[] = [];
    const invalidOptions: number[] = [];

    product.productParts.forEach((productPart) => {
        const partOptions = productPart.part.options.map((option) => option.id);
        const selectedOptionForPart = Array.from(selectedOptionSet).find((optionId) =>
            partOptions.includes(optionId)
        );

        if (!selectedOptionForPart) {
            missingParts.push(productPart.part.id);
        } else if (!partOptions.includes(selectedOptionForPart)) {
            invalidOptions.push(selectedOptionForPart);
        }
    });

    return { missingParts, invalidOptions };
}