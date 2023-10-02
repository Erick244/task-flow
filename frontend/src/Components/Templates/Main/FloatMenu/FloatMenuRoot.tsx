import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FloatMenuRootProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function FloatMenuRoot({
    children,
    ...rest
}: FloatMenuRootProps) {
    return (
        <div
            {...rest}
            className={twMerge(
                "absolute dark:bg-neutral-600 bg-neutral-100 p-2 rounded shadow-lg shadow-black/20",
                rest.className
            )}
        >
            {children}
        </div>
    );
}
