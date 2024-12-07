import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Option } from './option.entity';
import { ForbiddenCombination } from './forbidden-combination.entity';

@Entity()
export class ForbiddenCombinationOption extends BaseEntity {
    @ManyToOne(() => ForbiddenCombination, (fc) => fc.forbiddenCombinationOptions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'forbidden_combination_id' })
    forbiddenCombination!: ForbiddenCombination;

    @ManyToOne(() => Option, (option) => option.forbiddenCombinationOptions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'option_id' })
    option!: Option;
}
