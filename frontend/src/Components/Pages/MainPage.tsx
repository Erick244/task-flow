"use client";
import { MainProviders } from "@/app/main/Providers";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import MainLayoutMain from "../Layouts/MainLayout/Main/MainLayoutMain";
import { DefaultLoadingPage } from "../Skeletons/Page/DefaultLoadingPage";
import DndContainer from "../User/Main/DragAndDrop/DndContainer";

export default function MainPage() {
    const { user } = useAuthContext();

    if (!user) return <DefaultLoadingPage />;

    return (
        <MainProviders>
            <MainLayoutMain>
                <DndContainer />
            </MainLayoutMain>
        </MainProviders>
    );
}
