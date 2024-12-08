"use server";

import { API_URLS } from "@/lib/apiUrls";
import axiosRequest from "@/lib/axiosInstace";
import { CreateProduct } from "@/types/apiTypes";

export async function fetchProductById(id: number) {
    return axiosRequest(API_URLS.products.fetchById(id));
}

export async function fetchProductsByCategory(categoryId: number) {
    return axiosRequest(API_URLS.categories.fetchProducts(categoryId));
}

export async function fetchProducts() {
    return axiosRequest(API_URLS.products.fetch());
}

export async function createProduct(product: CreateProduct) {
    return axiosRequest(API_URLS.products.create(), product, "POST");
}


export async function updateProduct(product: CreateProduct, productId: number) {
    return axiosRequest(API_URLS.products.update(productId), product, "PUT");
}


export async function deleteProduct(productId: number) {
    return axiosRequest(API_URLS.products.delete(productId), {}, "DELETE");
}


export async function associatePartToProduct(productId: number, partId: number) {
    return axiosRequest(API_URLS.products.associatePart(productId), {
        partId: partId
    }, "POST");
}

export async function disassociatePartFromProduct(productId: number, partId: number) {
    return axiosRequest(API_URLS.products.disassociatePart(productId, partId), {}, "DELETE");
}
