import { BASE_API_URL, TEMP_BEARER_TOKEN } from "@/utils/constants";
import axios from "axios";

export async function fetchData(url: string) {
    try {
        const config = {
            headers: {
                Authorization: TEMP_BEARER_TOKEN,
            },
        };

        const response = await axios.get(`${BASE_API_URL}${url}`, config);
        const data = await response.data;

        return data;
    } catch (e) {
        throw e;
    }
}
