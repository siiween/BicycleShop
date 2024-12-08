"use server"
import { API_URLS } from "@/lib/apiUrls";
import axiosRequest from "@/lib/axiosInstace";
import { CreateOption } from "@/types/apiTypes";


export async function fetchOptionsById(id: number) {
    return axiosRequest(API_URLS.options.fetchById(id));
};

export async function fetchOptionsByPartId(id: number) {
    return axiosRequest(API_URLS.parts.fetchOptions(id));
}

export async function calculateOptionsPrice(selectedOptions: number[]) {
    return axiosRequest(API_URLS.options.calculatePrice(), { selectedOptionIds: selectedOptions }, "POST");
}

export async function createOption(option: CreateOption, partiId: number) {
    return axiosRequest(API_URLS.options.create(partiId), option, "POST");
}

export async function updateOption(optionId: number, option: CreateOption) {
    return axiosRequest(API_URLS.options.update(optionId), option, "PUT");
}

export async function deleteOption(optionId: number) {
    return axiosRequest(API_URLS.options.delete(optionId), {}, "DELETE");
}

export async function fetchDependentPrices(optionId: number) {
    return axiosRequest(API_URLS.options.fetchDependentPrices(optionId));
}

