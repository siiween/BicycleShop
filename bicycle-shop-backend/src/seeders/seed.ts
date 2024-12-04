
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ProductCategorySeeder } from './product-category.seeder';
import { AppDataSource } from '@config/data-source';

(async () => {
    const dataSource: DataSource = await AppDataSource.initialize();

    try {
        console.log('Seeding data...');
        await ProductCategorySeeder.seed(dataSource);
        console.log('Seeding complete!');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await dataSource.destroy();
    }
})();
