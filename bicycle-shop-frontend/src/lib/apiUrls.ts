export const API_URLS = {
  categories: {
    fetch: () => `/categories`,
    fetchProducts: (categoryId: number) => `/categories/${categoryId}/products`,
  },
  products: {
    fetch: () => `/products`,
    fetchById: (id: number) => `/products/${id}`,
    fetchParts: (productId: number) => `/products/${productId}/parts`,
    create: () => `/products`,
    update: (productId: number) => `/products/${productId}`,
    delete: (productId: number) => `/products/${productId}`,
    associatePart: (productId: number) => `/products/${productId}/parts`,
    disassociatePart: (productId: number, partId: number) =>
      `/products/${productId}/parts/${partId}`,
  },
  parts: {
    fetch: () => `/parts`,
    fetchById: (id: number) => `/parts/${id}`,
    fetchOptions: (id: number) => `/parts/${id}/options`,
    create: () => `/parts`,
    update: (partId: number) => `/parts/${partId}`,
    delete: (partId: number) => `/parts/${partId}`,
  },
  options: {
    fetchById: (id: number) => `/options/${id}`,
    fetchDependentPrices: (optionId: number) =>
      `/options/${optionId}/dependent-prices`,
    create: (partId: number) => `/options/${partId}`,
    update: (optionId: number) => `/options/${optionId}`,
    delete: (optionId: number) => `/options/${optionId}`,
    calculatePrice: () => `/options/price/calculate`,
  },
  forbiddenCombinations: {
    fetch: () => `/forbidden-combinations`,
    validate: () => `/forbidden-combinations/validate`,
    validateProductConfiguration: (productId: number) =>
      `/forbidden-combinations/validate-product-configuration/${productId}`,
    create: () => `/forbidden-combinations`,
    delete: (id: number) => `/forbidden-combinations/${id}`,
  },
  dependentPrices: {
    create: () => `/dependent-prices`,
    delete: (id: number) => `/dependent-prices/${id}`,
  },
  checkout: () => `/forbidden-combinations/checkout`,
};
