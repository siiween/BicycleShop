"use server"
import { API_URLS } from "@/lib/apiUrls";
import axiosRequest from "@/lib/axiosInstace";
import { CreatePart } from "@/types/apiTypes";

export async function fetchPartById(id: number) {
    return axiosRequest(API_URLS.parts.fetchById(id));
}

export async function fetchParts() {
    return axiosRequest(API_URLS.parts.fetch());
}

export async function createPart(part: CreatePart) {
    return axiosRequest(API_URLS.parts.create(), part, "POST");
}

export async function updatePart(part: CreatePart, partId: number) {
    return axiosRequest(API_URLS.parts.update(partId), part, "PUT");
}

export async function deletePart(partId: number) {
    return axiosRequest(API_URLS.parts.delete(partId), {}, "DELETE");
}

export async function fetchPartsByProductId(productId: number) {
    return axiosRequest(API_URLS.products.fetchParts(productId));
}