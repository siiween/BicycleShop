import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

interface AxiosRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  params?: Record<string, unknown>;
}

async function axiosRequest(
  endpoint: string,
  data: Record<string, unknown> | FormData = {},
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
) {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
    };

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      config.data = data;

      if (data instanceof FormData) {
        config.headers = {
          'Content-Type': 'multipart/form-data',
        };
      }
    }

    const response = await axiosInstance.request(config);
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
