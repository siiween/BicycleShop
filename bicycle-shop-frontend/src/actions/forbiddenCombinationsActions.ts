"use server";
import { API_URLS } from "@/lib/apiUrls";
import axiosRequest from "@/lib/axiosInstace";
import { CreateForbiddenCombination } from "@/types/apiTypes";

export async function fetchForbbidenCombinations() {
    return axiosRequest(API_URLS.forbiddenCombinations.fetch());
}

export async function validateOptionsCombinations(
    selectedOptions: Record<number, { id: number; name: string }>,
    optionId: number) {
    return axiosRequest(API_URLS.forbiddenCombinations.validate(), {
        selectedOptionIds: Object.values(selectedOptions).map((option) => option.id),
        newOptionId: optionId,
    }, "POST");
}


export async function deleteForbiddenCombination(id: number) {
    return axiosRequest(API_URLS.forbiddenCombinations.delete(id), {}, "DELETE");
}

export async function createForbiddenCombination(forbiddenCombination: CreateForbiddenCombination) {
    return axiosRequest(API_URLS.forbiddenCombinations.create(), forbiddenCombination, "POST");
}

export async function validateProuctConfiguration(selectedOptions: Record<number, { id: number; name: string }>, productId: number) {
    return axiosRequest(API_URLS.forbiddenCombinations.validateProductConfiguration(productId), {
        selectedOptionIds: Object.values(selectedOptions).map((option) => option.id),
    }, "POST");
}