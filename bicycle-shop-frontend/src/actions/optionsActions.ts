import axiosRequest from "@/lib/axiosInstace";

export async function fetchOptionsByPartId(id: number) {
    console.log('fetchOptionsByPartId');
    return axiosRequest(`/parts/${id}/options`);
}


export async function calculateOptionsPrice(selectedOptions: number[]) {
    return axiosRequest(`/options/calculate`, {
        method: 'POST',
        data: selectedOptions
    });
}