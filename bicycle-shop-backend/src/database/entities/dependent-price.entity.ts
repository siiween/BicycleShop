import { Entity, Column, ManyToOne, JoinColumn, Unique, Check } from 'typeorm';
import { Option } from './option.entity';
import { BaseEntity } from './base.entity';

@Entity()
@Unique(['option', 'conditionOption'])
@Check('"option_id" != "condition_option_id"')
export class DependentPrice extends BaseEntity {
    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @ManyToOne(() => Option, (option) => option.dependentPrices, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'option_id' })
    option!: Option;

    @ManyToOne(() => Option, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'condition_option_id' })
    conditionOption!: Option;
}
