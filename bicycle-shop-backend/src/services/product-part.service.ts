import { AppDataSource } from '@config/data-source';
import { ProductPart } from '@database/entities/product-part.entity';
import { Product } from '@database/entities/product.entity';
import { Part } from '@database/entities/part.entity';
import { HttpError } from '@errors/http-error.class';

export class ProductPartService {
    static async getAllPartsByProduct(productId: number): Promise<Part[]> {
        const product = await AppDataSource.getRepository(Product).findOne({
            where: { id: productId },
            relations: ['productParts', 'productParts.part'],
        });
        if (!product) {
            throw new HttpError(404, 'Product not found');
        }

        return product.productParts.map((pp) => pp.part);
    }

    static async associatePartToProduct(productId: number, partId: number): Promise<ProductPart> {
        const product = await AppDataSource.getRepository(Product).findOneBy({
            id: productId,
        });
        if (!product) {
            throw new HttpError(404, 'Product not found');
        }

        const part = await AppDataSource.getRepository(Part).findOneBy({ id: partId });
        if (!part) {
            throw new HttpError(404, 'Part not found');
        }

        const productPart = new ProductPart();
        productPart.product = product;
        productPart.part = part;

        return await AppDataSource.getRepository(ProductPart).save(productPart);
    }

    static async disassociatePartFromProduct(productId: number, partId: number): Promise<void> {
        const productPart = await AppDataSource.getRepository(ProductPart).findOne({
            where: {
                product: { id: productId },
                part: { id: partId },
            },
        });

        if (!productPart) {
            throw new HttpError(404, 'Association not found');
        }

        await AppDataSource.getRepository(ProductPart).remove(productPart);
    }
}
