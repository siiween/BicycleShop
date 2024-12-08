import { Option, Product } from "./apiTypes"

export interface ShoppingCart {
    products: {
        product: Product;
        options: Option[];
        configurationId: number;
    }[];
}