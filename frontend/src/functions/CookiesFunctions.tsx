import { parseCookies } from "nookies";

export function getCookieInClient(cookieName: string) {
    const { [cookieName]: cookie } = parseCookies();

    return cookie;
}
