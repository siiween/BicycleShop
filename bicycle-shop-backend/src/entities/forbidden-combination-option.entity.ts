import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ForbiddenCombination } from './forbidden-combination.entity';
import { Option } from './option.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class ForbiddenCombinationOption extends BaseEntity {
    @ManyToOne(() => ForbiddenCombination, (fc) => fc.forbiddenCombinationOptions)
    @JoinColumn({ name: 'forbidden_combination_id' })
    forbiddenCombination!: ForbiddenCombination;

    @ManyToOne(() => Option)
    @JoinColumn({ name: 'option_id' })
    option!: Option;
}
