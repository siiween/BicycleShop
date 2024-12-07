import { AppDataSource } from '@config/data-source';
import { ForbiddenCombination } from '@entities/forbidden-combination.entity';
import { ForbiddenCombinationOption } from '@entities/forbidden-combination-option.entity';


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
