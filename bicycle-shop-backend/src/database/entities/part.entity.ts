import { Entity, Column, OneToMany } from 'typeorm';
import { ProductPart } from './product-part.entity';
import { Option } from './option.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Part extends BaseEntity {
    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => ProductPart, (productPart) => productPart.part)
    productParts!: ProductPart[];

    @OneToMany(() => Option, (option) => option.part)
    options!: Option[];
}
