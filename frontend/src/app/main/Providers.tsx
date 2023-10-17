"use client";
import { DefaultLoadingPage } from "@/Components/Skeletons/Page/DefaultLoadingPage";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import TaskFlowDndContextProvider from "@/contexts/dnd/TaskFlowDndContext";

interface ProvidersProps {
    children: React.ReactNode;
}

export function MainProviders({ children }: ProvidersProps) {
    const { user } = useAuthContext();

    if (!user) return <DefaultLoadingPage />;

    return <TaskFlowDndContextProvider>{children}</TaskFlowDndContextProvider>;
}
