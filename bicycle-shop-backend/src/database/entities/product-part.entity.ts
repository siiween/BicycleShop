import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Part } from './part.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class ProductPart extends BaseEntity {

    @ManyToOne(() => Product, (product) => product.productParts)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @ManyToOne(() => Part, (part) => part.productParts)
    @JoinColumn({ name: 'part_id' })
    part!: Part;
}
