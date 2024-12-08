"use server";
import axiosRequest from "@/lib/axiosInstace";
import { CreateForbiddenCombination } from "@/types/apiTypes";

export async function fetchForbbidenCombinations() {
    return axiosRequest(`/forbidden-combinations`);
}

export async function validateOptionsCombinations(
    selectedOptions: Record<number, { id: number; name: string }>,
    optionId: number) {
    return axiosRequest(`/forbidden-combinations/validate`, {
        selectedOptionIds: Object.values(selectedOptions).map((option) => option.id),
        newOptionId: optionId,
    }, "POST");
}


export async function deleteForbiddenCombination(id: number) {
    return axiosRequest(`/forbidden-combinations/${id}`, {}, "DELETE");
}

export async function createForbiddenCombination(forbiddenCombination: CreateForbiddenCombination) {
    return axiosRequest(`/forbidden-combinations`, forbiddenCombination, "POST");
}

export async function validateProuctConfiguration(selectedOptions: Record<number, { id: number; name: string }>, productId: number) {
    return axiosRequest(`/forbidden-combinations/validate-product-configuration/${productId}`, {
        selectedOptionIds: Object.values(selectedOptions).map((option) => option.id),
    }, "POST");
}