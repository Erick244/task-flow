"use client";

import ToggleTheme from "@/Components/Utils/ToggleTheme";
import { menuDropDownVisibilityAtom } from "@/atomns/VisibilityAtoms";
import { useAtomValue } from "jotai";
import { twMerge } from "tailwind-merge";
import { LogOutItem } from "./LogOutItem";

export default function MainLayoutMenuDropDownItems() {
    const menuDropDownIsVisible = useAtomValue(menuDropDownVisibilityAtom);

    return (
        <div
            className={twMerge(
                "flex flex-col gap-5 absolute rounded w-full left-0 dark:bg-neutral-700 bg-neutral-300 p-2 shadow-md shadow-black/30",
                menuDropDownIsVisible
                    ? "top-16 visible opacity-100"
                    : "invisible top-10 opacity-0"
            )}
        >
            <ToggleTheme className="border-2 border-neutral-400 dark:border-white/30 p-2 rounded-lg" />
            <LogOutItem />
        </div>
    );
}
