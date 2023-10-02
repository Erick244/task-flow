import TaskFlowLogo from "@/Components/Utils/TaskFlowLogo";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="h-screen w-screen flex justify-center items-center flex-wrap dark:bg-neutral-700 bg-stone-300">
            <TaskFlowLogo heigth={300} width={300} />
            {children}
        </div>
    );
}
