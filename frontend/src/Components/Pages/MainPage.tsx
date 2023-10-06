"use client";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import TaskFlowDndContextProvider from "@/contexts/dnd/TaskFlowDndContext";
import DndContainer from "../User/Main/DragAndDrop/DndContainer";

export default function MainPage() {
    const { user } = useAuthContext();

    if (!user) return <p>Loading...</p>;

    return (
        <TaskFlowDndContextProvider>
            <DndContainer />;
        </TaskFlowDndContextProvider>
    );
}
