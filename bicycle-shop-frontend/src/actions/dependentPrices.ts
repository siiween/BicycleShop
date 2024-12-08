"use server";

import { API_URLS } from "@/lib/apiUrls";
import axiosRequest from "@/lib/axiosInstace";
import { CreateDependentPrice } from "@/types/apiTypes";

export async function deleteDependentPrice(id: number) {
    return axiosRequest(API_URLS.dependentPrices.delete(id), {}, "DELETE");
}

export async function createDependentPrice(data: CreateDependentPrice) {
    return axiosRequest(API_URLS.dependentPrices.create(), data, "POST");
}