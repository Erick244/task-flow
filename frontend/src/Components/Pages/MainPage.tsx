"use client";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import TaskFlowDndContextProvider from "@/contexts/dnd/TaskFlowDndContext";
import MainLayoutMain from "../Layouts/MainLayout/Main/MainLayoutMain";
import { DefaultLoadingPage } from "../Skeletons/Page/DefaultLoadingPage";
import DndContainer from "../User/Main/DragAndDrop/DndContainer";

export default function MainPage() {
    const { user } = useAuthContext();

    if (!user) return <DefaultLoadingPage />;

    return (
        <TaskFlowDndContextProvider>
            <MainLayoutMain>
                <DndContainer />
            </MainLayoutMain>
        </TaskFlowDndContextProvider>
    );
}
