import Theme from "@/Components/Utils/Theme";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./Providers";
import "./globals.css";

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Task Flow",
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Theme>{children}</Theme>
                </Providers>
            </body>
        </html>
    );
}
