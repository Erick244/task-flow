import { fetchData } from "@/functions/ApiFunctions";
import { setBearerToken } from "@/functions/AxiosFuctions";
import { UserModel } from "@/models/entities/User.model";
import { SignInFormData } from "@/schemas/forms/signin-form.schema";
import { SignupFormData } from "@/schemas/forms/signup-form.schema";
import { BASE_API_URL } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContextProps {
    signUp: (signUpData: SignupFormData) => Promise<void>;
    signIn: (signInData: SignInFormData) => Promise<void>;
    user: UserModel | null;
}

const AuthContext = createContext({} as AuthContextProps);

const AUTH_TOKEN_NAME = "authToken-taskflow";
const { [AUTH_TOKEN_NAME]: authToken } = parseCookies();

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
                const userAuth = await fetchData(URL);

                setUser(userAuth);
            } catch (e) {
                console.error(e);
            }
        }

        recoverUser();
    }, []);

    async function signIn(signInData: SignInFormData) {
        try {
            const URL = `${BASE_API_URL}/auth/login`;
            const resp = await axios.post(URL, signInData);

            const { user, authToken } = await resp.data;

            const oneMounthInSeconds = 60 * 60 * 24 * 30;
            setCookie(null, AUTH_TOKEN_NAME, authToken, {
                maxAge: oneMounthInSeconds,
            });

            setBearerToken(authToken);
            setUser(user);

            push("/main");
        } catch (e: any) {
            const errorMessage = e.response.data; //TODO: Obter a mensagem de senha invalida
            throw errorMessage;
        }
    }

    async function signUp(signUpData: SignupFormData) {
        try {
            const URL = `${BASE_API_URL}/auth/signup`;
            await axios.post(URL, signUpData);
        } catch (e: any) {
            const errorMessage = e.response.data;
            throw errorMessage;
        }
    }

    return (
        <AuthContext.Provider value={{ signUp, signIn, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
