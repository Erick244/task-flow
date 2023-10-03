"use client";

import AuthContextProvider from "@/contexts/auth/AuthContext";
import { Provider } from "jotai";
import { ToastContainer } from "react-toastify";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <Provider>
            <ToastContainer />
            <AuthContextProvider>{children}</AuthContextProvider>
        </Provider>
    );
}
