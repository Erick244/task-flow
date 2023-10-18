import { getApiData, postApiData } from "@/functions/ApiFunctions";
import { getCookieInClient } from "@/functions/CookiesFunctions";
import { UserModel } from "@/models/entities/User.model";
import { UserAndToken } from "@/models/interfaces/UserAndToken.interface";
import { SignInFormData } from "@/schemas/forms/signin-form.schema";
import { SignupFormData } from "@/schemas/forms/signup-form.schema";
import { AUTH_TOKEN_NAME } from "@/utils/constants";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContextProps {
    signUp: (signUpData: SignupFormData) => Promise<void>;
    signIn: (signInData: SignInFormData) => Promise<void>;
    logOut: () => void;
    user: UserModel | null;
    setUser: Dispatch<SetStateAction<UserModel | null>>;
}

const AuthContext = createContext({} as AuthContextProps);

const authToken = getCookieInClient(AUTH_TOKEN_NAME);

export default function AuthContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { push } = useRouter();
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        async function recoverUser() {
            try {
                if (!authToken) return setUser(null);

                const URL = `/users/userByToken?authToken=${authToken}`;
                const userAuth = await getApiData(URL);

                setUser(userAuth);
            } catch (e) {
                console.error(e);
            }
        }

        recoverUser();
    }, []);

    async function signIn(signInData: SignInFormData) {
        try {
            const { user, authToken } = await postApiData<UserAndToken>(
                "/auth/login",
                signInData
            );

            const oneMounthInSeconds = 60 * 60 * 24 * 30;
            setCookie(null, AUTH_TOKEN_NAME, authToken, {
                maxAge: oneMounthInSeconds,
                path: "/",
            });

            setUser(user);
            push("/main");
        } catch (e: any) {
            const responseStatus = e.response.status;

            if (responseStatus === HttpStatusCode.Forbidden) {
                throw "Invalid password";
            } else {
                throw "This e-mail does not have an account";
            }
        }
    }

    async function signUp(signUpData: SignupFormData) {
        try {
            await postApiData("/auth/signup", signUpData);
        } catch (e: any) {
            const errorMessage = e.response.data;
            throw errorMessage;
        }
    }

    function logOut() {
        destroyCookie(null, AUTH_TOKEN_NAME);
        setUser(null);

        push("/auth/login");
    }

    return (
        <AuthContext.Provider value={{ signUp, signIn, user, logOut, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
