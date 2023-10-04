import axios from "axios";

export function setBearerToken(token: string) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}
