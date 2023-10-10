import MainLayoutHeader from "@/Components/Layouts/MainLayout/Header/MainLayoutHeader";
import MainLayoutMain from "@/Components/Layouts/MainLayout/Main/MainLayoutMain";
import { MainProviders } from "./Providers";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex flex-col w-screen h-screen">
            <MainLayoutHeader />
            <MainProviders>
                <MainLayoutMain>{children}</MainLayoutMain>
            </MainProviders>
        </div>
    );
}
