"use cleint";
import { darkModeAtom } from "@/atomns/DarkModeAtom";
import { useAtom } from "jotai";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { MoonIcon, SunIcon } from "./Icons";

interface ThemeButtonProps extends HTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element;
}

function ThemeButton({ icon, ...rest }: ThemeButtonProps) {
    return (
        <button
            {...rest}
            className={twMerge(
                "p-2 border-2 border-neutral-400 dark:border-white/30 flex items-center rounded-full",
                rest.className
            )}
        >
            {icon}
        </button>
    );
}

export default function ToggleTheme(props: HTMLAttributes<HTMLDivElement>) {
    const [isDarkMode, setDarkMode] = useAtom(darkModeAtom);

    function setDarkTheme() {
        setDarkMode(true);
    }

    function setLightTheme() {
        setDarkMode(false);
    }

    return (
        <div
            {...props}
            className={twMerge(
                "w-full flex justify-between items-center",
                props.className
            )}
        >
            <ThemeButton
                icon={MoonIcon}
                className={
                    isDarkMode
                        ? "bg-blue-500 scale-110"
                        : "dark:text-white text-neutral-600 bg-none scale-100"
                }
                onClick={setDarkTheme}
            />
            <ThemeButton
                icon={SunIcon}
                className={
                    !isDarkMode
                        ? "bg-blue-500 scale-110 text-white"
                        : "bg-none scale-100"
                }
                onClick={setLightTheme}
            />
        </div>
    );
}
