"use client";
import { MenuDropDown } from "@/Components/Templates/Layout/MenuDropDown";
import { AngleDownIcon } from "@/Components/Utils/Icons";
import { menuDropDownVisibilityAtom } from "@/atomns/VisibilityAtoms";
import { useAtom } from "jotai";

export default function MainLayoutMenuDropDownAction() {
    const [menuDropDownIsVisible, setMenuDropDownVisibility] = useAtom(
        menuDropDownVisibilityAtom
    );

    function toggleMenuDropDownVisibiliry() {
        setMenuDropDownVisibility(!menuDropDownIsVisible);
    }

    return (
        <MenuDropDown.Action
            className={menuDropDownIsVisible ? "rotate-180" : "rotate-0"}
            icon={AngleDownIcon}
            onClick={toggleMenuDropDownVisibiliry}
        />
    );
}
