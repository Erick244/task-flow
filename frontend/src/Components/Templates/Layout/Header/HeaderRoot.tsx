import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderRootProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export default function HeaderRoot({ children, ...rest }: HeaderRootProps) {
    return (
        <header
            {...rest}
            className={twMerge(
                "h-20 dark:bg-neutral-600 bg-neutral-200 shadow-md shadow-black/30 z-30",
                rest.className
            )}
        >
            {children}
        </header>
    );
}
