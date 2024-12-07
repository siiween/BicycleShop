"use server"
import axiosRequest from "@/lib/axiosInstace";
import { CreateOption } from "@/types/apiTypes";


export async function fetchOptionsById(id: number) {
    return axiosRequest(`/options/${id}`);
};

export async function fetchOptionsByPartId(id: number) {
    return axiosRequest(`/parts/${id}/options`);
}

export async function calculateOptionsPrice(selectedOptions: number[]) {
    return axiosRequest(`options/price/calculate`, { selectedOptionIds: selectedOptions }, "POST");
}

export async function createOption(option: CreateOption, partiId: number) {
    return axiosRequest(`/options/` + partiId, option, "POST");
}

export async function updateOption(optionId: number, option: CreateOption) {
    return axiosRequest(`/options/` + optionId, option, "PUT");
}

export async function deleteOption(optionId: number) {
    return axiosRequest(`/options/` + optionId, {}, "DELETE");
}

export async function fetchDependentPrices(optionId: number) {
    return axiosRequest(`/options/${optionId}/dependent-prices`);
}

