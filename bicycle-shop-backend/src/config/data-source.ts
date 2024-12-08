import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ProductCategory } from '@entities/product-category.entity';
import { Product } from '@entities/product.entity';
import { Part } from '@entities/part.entity';
import { ProductPart } from '@entities/product-part.entity';
import { Option } from '@entities/option.entity';
import { DependentPrice } from '@entities/dependent-price.entity';
import { ForbiddenCombination } from '@entities/forbidden-combination.entity';
import { ForbiddenCombinationOption } from '@entities/forbidden-combination-option.entity';
import * as dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
});

const isPostgres = process.env.DB_TYPE === 'postgres';

export const AppDataSource = new DataSource({
    type: isPostgres ? 'postgres' : 'sqlite',
    host: process.env.DB_HOST || undefined,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    username: process.env.DB_USERNAME || undefined,
    password: process.env.DB_PASSWORD || undefined,
    database: process.env.DB_NAME || 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [
        ProductCategory,
        Product,
        Part,
        ProductPart,
        Option,
        DependentPrice,
        ForbiddenCombination,
        ForbiddenCombinationOption,
    ],
    migrations: [],
    subscribers: [],
});
