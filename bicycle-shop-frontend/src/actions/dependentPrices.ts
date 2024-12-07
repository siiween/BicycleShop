"use server";
import axiosRequest from "@/lib/axiosInstace";
import { CreateDependentPrice } from "@/types/apiTypes";

export async function deleteDependentPrice(id: number) {
    return axiosRequest(`/dependent-prices/` + id, {}, "DELETE");
}

export async function createDependentPrice(data: CreateDependentPrice) {
    return axiosRequest(`/dependent-prices`, data, "POST");
}