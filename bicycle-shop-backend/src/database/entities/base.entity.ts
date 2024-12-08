import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({
        type: process.env.DB_TYPE === 'postgres' ? 'timestamp' : 'datetime',
        default: () => (process.env.DB_TYPE === 'postgres' ? 'CURRENT_TIMESTAMP' : '(datetime(\'now\'))'),
    })
    created_at!: Date;

    @UpdateDateColumn({
        type: process.env.DB_TYPE === 'postgres' ? 'timestamp' : 'datetime',
        default: () => (process.env.DB_TYPE === 'postgres' ? 'CURRENT_TIMESTAMP' : '(datetime(\'now\'))'),
        onUpdate: process.env.DB_TYPE === 'postgres' ? 'CURRENT_TIMESTAMP' : '(datetime(\'now\'))',
    })
    updated_at!: Date;
}
