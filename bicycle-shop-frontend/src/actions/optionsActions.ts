"use server"
import axiosRequest from "@/lib/axiosInstace";
import { CreateOption } from "@/types/apiTypes";

export async function fetchOptionsByPartId(id: number) {
    return axiosRequest(`/parts/${id}/options`);
}

export async function calculateOptionsPrice(selectedOptions: number[]) {
    return axiosRequest(`options/price/calculate`, { selectedOptionIds: selectedOptions }, "POST");
}

export async function createOption(option: CreateOption, partiId: number) {
    return axiosRequest(`/options/` + partiId, option, "POST");
}


export async function validateOptions(
    selectedOptions: Record<number, { id: number; name: string }>,
    optionId: number) {
    return axiosRequest(`/options/forbidden-combinations/validate`, {
        selectedOptionIds: Object.values(selectedOptions).map((option) => option.id),
        newOptionId: optionId,
    }, "POST");
}


export async function deleteOption(optionId: number) {
    return axiosRequest(`/options/` + optionId, {}, "DELETE");
}