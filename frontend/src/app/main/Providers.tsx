"use client";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import TaskFlowDndContextProvider from "@/contexts/dnd/TaskFlowDndContext";

interface ProvidersProps {
    children: React.ReactNode;
}

export function MainProviders({ children }: ProvidersProps) {
    const { user } = useAuthContext();

    if (!user)
        return (
            <p className="h-screen w-screen dark:bg-neutral-700 bg-stone-300">
                Loading...
            </p>
        );

    return <TaskFlowDndContextProvider>{children}</TaskFlowDndContextProvider>;
}
