import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonSkeletonProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function ButtonSkeleton({ children, ...rest }: ButtonSkeletonProps) {
    return (
        <button
            {...rest}
            className={twMerge(
                "dark:bg-neutral-600 dark:hover:bg-neutral-500 text-white bg-neutral-500 hover:bg-neutral-600 gap-2 px-3 py-2 shadow-md shadow-black/30 rounded",
                rest.className
            )}
        >
            {children}
        </button>
    );
}
