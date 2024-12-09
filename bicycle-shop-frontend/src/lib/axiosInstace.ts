import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

async function axiosRequest(
  endpoint: string,
  data: Record<string, unknown> = {},
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
) {
  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      ...(method === 'POST' || method === 'PUT' || method === 'DELETE'
        ? { data }
        : { params: data }),
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error(
        `Error in bicycle shop API request to ${endpoint}:`,
        error.response?.data || error.message
      );
      throw new Error(`Failed to fetch data from ${endpoint}.`);
    } else {
      console.error(`Unexpected error: ${error}`);
      throw new Error('An unexpected error occurred.');
    }
  }
}

export default axiosRequest;
