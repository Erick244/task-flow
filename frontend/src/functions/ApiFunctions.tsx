import axios from "@/libs/axios";
import { AxiosRequestConfig } from "axios";

export async function getApiData<R = any>(
    url: string,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const response = await axios.get(url, config);
        const data = await response.data;

        return data;
    } catch (e) {
        throw e;
    }
}

export async function postApiData<R = any>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const response = await axios.post(url, body, config);
        const data = await response.data;

        return data;
    } catch (e) {
        throw e;
    }
}

export async function deleteApiData<R = any>(
    url: string,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const response = await axios.delete(url, config);
        const data = await response.data;

        return data;
    } catch (e) {
        throw e;
    }
}
