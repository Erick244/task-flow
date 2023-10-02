"use client";

import { MenuDropDown } from "@/Components/Templates/Layout/MenuDropDown";
import { LogoutIcon } from "@/Components/Utils/Icons";
import ToggleTheme from "@/Components/Utils/ToggleTheme";
import { menuDropDownVisibilityAtom } from "@/atomns/VisibilityAtoms";
import { useAtomValue } from "jotai";
import { twMerge } from "tailwind-merge";

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
            <MenuDropDown.Item
                className="border-red-500 hover:bg-red-500/10 text-black/50 hover:text-red-500 dark:hover:text-red-500 dark:text-white/50"
                title="Logout"
                icon={LogoutIcon}
            />
        </div>
    );
}
