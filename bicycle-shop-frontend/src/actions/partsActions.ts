"use server"
import axiosRequest from "@/lib/axiosInstace";
import { CreatePart } from "@/types/apiTypes";

export async function fetchPartById(id: number) {
    return axiosRequest(`/parts/${id}`);
}

export async function fetchParts() {
    return axiosRequest(`/parts`);
}

export async function createPart(part: CreatePart) {
    return axiosRequest(`/parts`, part, "POST");
}

export async function updatePart(part: CreatePart, partId: number) {
    return axiosRequest(`/parts/` + partId, part, "PUT");
}

export async function deletePart(partId: number) {
    return axiosRequest(`/parts/` + partId, {}, "DELETE");
}

