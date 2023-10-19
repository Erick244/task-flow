import MainLayoutHeader from "@/Components/Layouts/MainLayout/Header/MainLayoutHeader";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex flex-col w-screen h-screen">
            <MainLayoutHeader />
            {children}
        </div>
    );
}
