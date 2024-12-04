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

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
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
