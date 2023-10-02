import { MenuDropDown } from "@/Components/Templates/Layout/MenuDropDown";
import MainLayoutMenuDropDownHeader from "./MainLayoutMenuDropDownHeader";
import MainLayoutMenuDropDownItems from "./MainLayoutMenuDropDownItems";

export default function MainLayoutMenuDropDown() {
    return (
        <MenuDropDown.Root className="flex flex-col gap-4 mr-5 relative border-b-2 border-blue-500">
            <MainLayoutMenuDropDownHeader />
            <MainLayoutMenuDropDownItems />
        </MenuDropDown.Root>
    );
}
