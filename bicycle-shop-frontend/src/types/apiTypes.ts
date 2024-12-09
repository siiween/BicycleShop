export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Option {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  is_available: boolean;
  image_url: string | null;
  part: Part;
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

export interface CreatePart extends Record<string, unknown> {
  name: string;
  description: string;
}

export interface CreateOption extends Record<string, unknown> {
  name: string;
  description: string;
  price: number;
  quantity: number;
  is_available: boolean;
}

export interface ForbiddenCombination {
  id: number;
  name: string;
  forbiddenCombinationOptions: {
    option: Option;
    id: number;
  }[];
}

export interface DependentPrice {
  id: number;
  price: number;
  option: Option;
  conditionOption: Option;
}

export interface CreateDependentPrice extends Record<string, unknown> {
  price: number;
  optionId: number;
  conditionOptionId: number;
}

export interface CreateForbiddenCombination extends Record<string, unknown> {
  name: string;
  optionIds: number[];
}


export interface checkoutProduct extends Record<string, unknown> {
  productId: number;
  selectedOptionIds: number[];
}