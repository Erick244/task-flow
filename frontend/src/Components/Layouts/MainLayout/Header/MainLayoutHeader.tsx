import { Header } from "@/Components/Templates/Layout/Header";
import MainLayoutMenuDropDown from "../MenuDropDown/MainLayoutMenuDropDown";

export default function MainLayoutHeader() {
    return (
        <Header.Root className="flex justify-between items-center">
            <Header.Logo />
            <MainLayoutMenuDropDown />
        </Header.Root>
    );
}
