import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { AppDataSource } from '@config/data-source';

import { ProductCategorySeeder } from './product-category.seeder';
import { ProductSeeder } from './product.seeder';
import { PartSeeder } from './part.seeder';
import { ProductPartSeeder } from './product-part.seeder';
import { OptionSeeder } from './option.seeder';
import { DependentPriceSeeder } from './dependent-price.seeder';
import { ForbiddenCombinationSeeder } from './forbidden-combination.seeder';

(async () => {
    const dataSource: DataSource = await AppDataSource.initialize();

    try {
        console.log('Seeding data...');
        await ProductCategorySeeder.seed(dataSource);
        await ProductSeeder.seed(dataSource);
        await PartSeeder.seed(dataSource);
        await ProductPartSeeder.seed(dataSource);
        await OptionSeeder.seed(dataSource);
        await DependentPriceSeeder.seed(dataSource);
        await ForbiddenCombinationSeeder.seed(dataSource);
        console.log('Seeding complete!');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await dataSource.destroy();
    }
})();
