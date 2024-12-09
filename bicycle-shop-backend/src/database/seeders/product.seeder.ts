import { DataSource } from 'typeorm';

import { Product } from '@entities/product.entity';
import { ProductCategory } from '@entities/product-category.entity';

export class ProductSeeder {
    public static async seed(dataSource: DataSource): Promise<void> {
        const productRepository = dataSource.getRepository(Product);
        const productCategoryRepository = dataSource.getRepository(ProductCategory);

        const categories = await productCategoryRepository.find({
            where: [{ name: 'Skates' }, { name: 'Bicycles' }],
        });

        if (categories.length !== 2) {
            throw new Error('Skates or Bicycles category not found. Ensure ProductCategorySeeder has run.');
        }

        const skatesCategory = categories.find(cat => cat.name === 'Skates');
        const bicyclesCategory = categories.find(cat => cat.name === 'Bicycles');

        const products = [
            // Skates
            {
                name: 'Urban Skate',
                description: 'A durable skate for urban environments.',
                is_active: true,
                category: skatesCategory,
                image_url: `${process.env.BACKEND_URL ?? "http://localhost"}:${process.env.PORT}/uploads/skate1.png`,
            },
            {
                name: 'Freestyle Skate',
                description: 'Perfect for tricks and freestyle moves.',
                is_active: true,
                category: skatesCategory,
                image_url: `${process.env.BACKEND_URL ?? "http://localhost"}:${process.env.PORT}/uploads/skate2.png`,
            },
            {
                name: 'Speed Skate',
                description: 'Designed for speed and performance.',
                is_active: true,
                category: skatesCategory,
                image_url: `${process.env.BACKEND_URL ?? "http://localhost"}:${process.env.PORT}/uploads/skate3.png`,
            },
            // Bicycles
            {
                name: 'City Bike',
                description: 'Ideal for commuting and city rides.',
                is_active: true,
                category: bicyclesCategory,
                image_url: `${process.env.BACKEND_URL ?? "http://localhost"}:${process.env.PORT}/uploads/bike1.png`,
            },
            {
                name: 'Mountain Bike',
                description: 'Perfect for off-road and trail adventures.',
                is_active: true,
                category: bicyclesCategory,
                image_url: `${process.env.BACKEND_URL ?? "http://localhost"}:${process.env.PORT}/uploads/bike2.png`,
            },
            {
                name: 'Road Bike',
                description: 'Lightweight and aerodynamic for road biking.',
                is_active: true,
                category: bicyclesCategory,
                image_url: `${process.env.BACKEND_URL ?? "http://localhost"}:${process.env.PORT}/uploads/bike3.png`,
            },
        ];

        const productEntities = products.map(product => productRepository.create(product));

        await productRepository.save(productEntities);

        console.log('Seeded Products: Skates and Bicycles with three products each');
    }
}
