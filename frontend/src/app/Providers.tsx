"use client";

import { Provider } from "jotai";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return <Provider>{children}</Provider>;
}
