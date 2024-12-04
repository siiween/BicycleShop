import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Part } from './part.entity';
import { DependentPrice } from './dependent-price.entity';
import { ForbiddenCombinationOption } from './forbidden-combination-option.entity';

@Entity()
export class Option extends BaseEntity {
    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column('int', { default: 0 })
    quantity!: number;

    @Column({ default: true })
    is_available!: boolean;

    @Column({ nullable: true })
    image_url?: string;

    @ManyToOne(() => Part, (part) => part.options)
    @JoinColumn({ name: 'part_id' })
    part!: Part;

    @OneToMany(() => DependentPrice, (dependentPrice) => dependentPrice.option)
    dependentPrices!: DependentPrice[];

    @OneToMany(() => ForbiddenCombinationOption, (fco) => fco.option)
    forbiddenCombinationOptions!: ForbiddenCombinationOption[];
}
