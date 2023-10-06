"use client";
import { MenuDropDown } from "@/Components/Templates/Layout/MenuDropDown";
import { LogoutIcon } from "@/Components/Utils/Icons";
import { useAuthContext } from "@/contexts/auth/AuthContext";

export function LogOutItem() {
    const { logOut } = useAuthContext();

    return (
        <MenuDropDown.Item
            className="border-red-500 hover:bg-red-500/10 text-black/50 hover:text-red-500 dark:hover:text-red-500 dark:text-white/50"
            title="Logout"
            icon={LogoutIcon}
            onClick={logOut}
        />
    );
}
