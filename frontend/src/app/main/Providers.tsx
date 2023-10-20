import TaskColumnsDndContextProvider from "@/contexts/dnd/TaskColumnsDndContext";
import TaskFlowDndContextProvider from "@/contexts/dnd/TaskFlowDndContext";
import TasksContextDndProvider from "@/contexts/dnd/TasksDndContext";

export function MainProviders({ children }: { children: React.ReactNode }) {
    return (
        <TaskColumnsDndContextProvider>
            <TasksContextDndProvider>
                <TaskFlowDndContextProvider>
                    {children}
                </TaskFlowDndContextProvider>
            </TasksContextDndProvider>
        </TaskColumnsDndContextProvider>
    );
}
