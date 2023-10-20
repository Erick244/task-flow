import TaskFlowDndContextProvider from "@/contexts/dnd/TaskFlowDndContext";
import TasksContextDndProvider from "@/contexts/dnd/TasksContextDnd";

export function MainProviders({ children }: { children: React.ReactNode }) {
    return (
        <TasksContextDndProvider>
            <TaskFlowDndContextProvider>{children}</TaskFlowDndContextProvider>
        </TasksContextDndProvider>
    );
}
