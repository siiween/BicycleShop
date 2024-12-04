import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductCategory } from './product-category.entity';
import { ProductPart } from './product-part.entity';

@Entity()
export class Product extends BaseEntity {
    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    image_url?: string;

    @Column({ default: true })
    is_active!: boolean;

    @ManyToOne(() => ProductCategory, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category!: ProductCategory;

    @OneToMany(() => ProductPart, (productPart) => productPart.product)
    productParts!: ProductPart[];
}
