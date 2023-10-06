import axios from "@/libs/axios";

export function setInAxiosTheBearerToken(token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
