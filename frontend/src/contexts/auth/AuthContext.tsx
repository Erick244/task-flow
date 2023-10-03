import { SignupFormData } from "@/schemas/forms/signup-form.schema";
import { BASE_API_URL } from "@/utils/constants";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";
import { toast } from "react-toastify";

interface AuthContextProps {
    signUp: (signUpData: SignupFormData) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

export default function AuthContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    async function signUp(signUpData: SignupFormData) {
        try {
            const URL = `${BASE_API_URL}/auth/signup`;
            await axios.post(URL, signUpData);
        } catch (e: any) {
            const errorMessage = e.response.data;
            toast(errorMessage, { type: "warning", theme: "dark" });
        }
    }

    return (
        <AuthContext.Provider value={{ signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
