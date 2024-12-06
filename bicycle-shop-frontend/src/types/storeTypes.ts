export interface Part {
    id: number;
    name: string;
    description: string;
}

export interface Option {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    is_available: boolean;
    image_url: string | null;
}