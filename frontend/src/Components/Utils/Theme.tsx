"use client";

import { darkModeAtom } from "@/atomns/DarkModeAtom";
import { useAtomValue } from "jotai";

interface ThemeProps {
    children: React.ReactNode;
}

export default function Theme({ children }: ThemeProps) {
    const isDarkMode = useAtomValue(darkModeAtom);

    return <div className={isDarkMode ? "dark" : "light"}>{children}</div>;
}
