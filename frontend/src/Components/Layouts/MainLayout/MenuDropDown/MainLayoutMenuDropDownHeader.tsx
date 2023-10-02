import MainLayoutUserProfile from "../UserProfile/MainLayoutUserProfile";
import MainLayoutMenuDropDownAction from "./MainLayoutMenuDropDownAction";

export default function MainLayoutMenuDropDownHeader() {
    return (
        <div className="flex items-center gap-2 z-10">
            <MainLayoutUserProfile />
            <MainLayoutMenuDropDownAction />
        </div>
    );
}
