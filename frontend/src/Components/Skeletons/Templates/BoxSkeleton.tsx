import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface BoxSkeletonProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function BoxSkeleton({ children, ...rest }: BoxSkeletonProps) {
    return (
        <div
            {...rest}
            className={twMerge(
                "dark:bg-neutral-600 bg-neutral-200 text-neutral-600 shadow-md shadow-black/10 rounded p-2",
                rest.className
            )}
        >
            {children}
        </div>
    );
}
