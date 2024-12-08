"use server"

import { API_URLS } from "@/lib/apiUrls";
import axiosRequest from "@/lib/axiosInstace";

export async function fetchCategories() {
    return axiosRequest(API_URLS.categories.fetch());
}
