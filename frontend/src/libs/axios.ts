import { getCookieInClient } from "@/functions/CookiesFunctions";
import { AUTH_TOKEN_NAME, BASE_API_URL } from "@/utils/constants";
import axios from "axios";

const instance = axios.create({
    baseURL: BASE_API_URL,
});

instance.interceptors.request.use(
    function (config) {
        const authToken = getCookieInClient(AUTH_TOKEN_NAME);

        if (authToken) {
            config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
