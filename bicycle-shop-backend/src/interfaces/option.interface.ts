export interface OptionResult {
    optionId: number;
    name: string;
    price: number;
    basePrice: number;
}

export interface CalculatePriceResponse {
    options: OptionResult[];
    total: number;
}
