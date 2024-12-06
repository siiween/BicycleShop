import axiosRequest from "@/lib/axiosInstace";

export async function fetchCategories() {
    return axiosRequest(`categories`);
}
