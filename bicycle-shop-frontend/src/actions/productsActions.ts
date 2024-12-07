"use server";

import axiosRequest from "@/lib/axiosInstace";
import { CreateProduct } from "@/types/apiTypes";

export async function fetchProductById(id: number) {
    return axiosRequest(`/products/${id}`);
}

export async function fetchPartsByProductId(productId: number) {
    return axiosRequest(`/products/${productId}/parts`);
}

export async function fetchProductsByCategory(categoryId: number) {
    return axiosRequest(`/categories/${categoryId}/products`);
}

export async function fetchProducts() {
    return axiosRequest(`/products`);
}

export async function createProduct(product: CreateProduct) {
    return axiosRequest(`/products`, product, "POST");
}


export async function updateProduct(product: CreateProduct, productId: number) {
    return axiosRequest(`/products/` + productId, product, "PUT");
}


export async function deleteProduct(productId: number) {
    return axiosRequest(`/products/` + productId, {}, "DELETE");
}


export async function associatePartToProduct(productId: number, partId: number) {
    return axiosRequest(`/products/${productId}/parts`, {
        partId: partId
    }, "POST");
}

export async function disassociatePartFromProduct(productId: number, partId: number) {
    return axiosRequest(`/products/${productId}/parts/${partId}`, {}, "DELETE");
}
