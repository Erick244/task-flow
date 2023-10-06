import { AUTH_TOKEN_NAME } from "@/utils/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getAuthToken() {
    const token = cookies().get(AUTH_TOKEN_NAME);

    return token;
}

function existTokenOrRedirectTo(redirectPath: string) {
    const token = getAuthToken();

    if (token) return;

    redirect(redirectPath);
}

function notExistTokenOrRedirectTo(redirectPath: string) {
    const token = getAuthToken();

    if (!token) return;

    redirect(redirectPath);
}

export { existTokenOrRedirectTo, getAuthToken, notExistTokenOrRedirectTo };
