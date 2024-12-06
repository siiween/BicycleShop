import { Option } from "./storeTypes";

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}


export interface Product {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
    image_url: string;
    is_active: boolean;
    category: Category;
}

export interface Part {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    product: Product;
}

export interface OptionsPrice {
    options: {
        optionId: number;
        name: string;
        price: number;
        basePrice: number;
    }[];
    total: number;
}


export interface CreateProduct extends Record<string, unknown> {
    name: string;
    description: string;
    category_id: number;
}