import { AppDataSource } from '@config/data-source';
import { Part } from '@database/entities/part.entity';
import { Option } from '@entities/option.entity';
import { HttpError } from '@errors/http-error.class';

export class PartService {
    static async getAllParts(): Promise<Part[]> {
        try {
            return await AppDataSource.getRepository(Part).find();
        } catch (error) {
            throw new HttpError(500, 'Failed to retrieve parts');
        }
    }

    static async getPartById(id: number): Promise<Part> {
        try {
            const part = await AppDataSource.getRepository(Part).findOneBy({ id });
            if (!part) {
                throw new HttpError(404, 'Part not found');
            }
            return part;
        } catch (error) {
            throw new HttpError(500, 'Failed to retrieve part');
        }
    }

    static async getOptionsByPart(id: number): Promise<Option[]> {
        const part = await AppDataSource.getRepository(Part).findOne({
            where: { id },
            relations: ['options'],
        });
        if (!part) throw new HttpError(404, 'Part not found');
        return part.options;
    }


    static async createPart(data: { name: string; description?: string }): Promise<Part> {
        try {
            const part = new Part();
            part.name = data.name;
            part.description = data.description;

            return await AppDataSource.getRepository(Part).save(part);
        } catch (error) {
            throw new HttpError(500, 'Failed to create part');
        }
    }

    static async updatePart(
        id: number,
        data: { name?: string; description?: string }
    ): Promise<Part> {
        try {
            const part = await AppDataSource.getRepository(Part).findOneBy({ id });
            if (!part) {
                throw new HttpError(404, 'Part not found');
            }

            if (data.name !== undefined) part.name = data.name;
            if (data.description !== undefined) part.description = data.description;

            return await AppDataSource.getRepository(Part).save(part);
        } catch (error) {
            throw new HttpError(500, 'Failed to update part');
        }
    }

    static async deletePart(id: number): Promise<void> {
        try {
            const part = await AppDataSource.getRepository(Part).findOneBy({ id });
            if (!part) {
                throw new HttpError(404, 'Part not found');
            }

            await AppDataSource.getRepository(Part).remove(part);
        } catch (error) {
            throw new HttpError(500, 'Failed to delete part');
        }
    }
}
