import { Entity, Column, OneToMany } from 'typeorm';
import { ForbiddenCombinationOption } from './forbidden-combination-option.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class ForbiddenCombination extends BaseEntity {
    @Column()
    name!: string;

    @OneToMany(() => ForbiddenCombinationOption, (fco) => fco.forbiddenCombination, { cascade: true })
    forbiddenCombinationOptions!: ForbiddenCombinationOption[];
}
