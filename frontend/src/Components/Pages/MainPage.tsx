"use client";
import TaskFlowDndContextProvider from "@/contexts/dnd/TaskFlowDndContext";
import DndContainer from "../User/Main/DragAndDrop/DndContainer";

export default function MainPage() {
    return (
        <TaskFlowDndContextProvider>
            <DndContainer />;
        </TaskFlowDndContextProvider>
    );
}
