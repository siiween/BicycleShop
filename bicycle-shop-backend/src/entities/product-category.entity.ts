import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductCategory extends BaseEntity {
    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => ProductCategory, (category) => category.children, { nullable: true })
    @JoinColumn({ name: 'parent_category_id' })
    parent?: ProductCategory;

    @OneToMany(() => ProductCategory, (category) => category.parent)
    children!: ProductCategory[];

    @OneToMany(() => Product, (product) => product.category)
    products!: Product[];
}
