import axiosRequest from "@/lib/axiosInstace";
import exp from "constants";

export async function fetchPartById(id: number) {
    return axiosRequest(`/parts/${id}`);
}

export async function fetchParts() {
    return axiosRequest(`/parts`);
}