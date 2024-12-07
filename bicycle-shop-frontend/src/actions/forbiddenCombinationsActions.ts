import axiosRequest from "@/lib/axiosInstace";

export async function fetchForbbidenCombinations() {
    return axiosRequest(`/options/forbidden-combinations`);
}
