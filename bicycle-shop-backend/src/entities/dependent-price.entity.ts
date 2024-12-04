import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Option } from './option.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class DependentPrice extends BaseEntity {
    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @ManyToOne(() => Option, (option) => option.dependentPrices)
    @JoinColumn({ name: 'option_id' })
    option!: Option;

    @ManyToOne(() => Option)
    @JoinColumn({ name: 'condition_option_id' })
    conditionOption!: Option;
}
