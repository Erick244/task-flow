import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function FormContainer({
    children,
    ...rest
}: FormContainerProps) {
    return (
        <div
            {...rest}
            className={twMerge(
                "p-4 dark:bg-neutral-700 bg-neutral-300 rounded shadow-lg shadow-black/20",
                rest.className
            )}
        >
            {children}
        </div>
    );
}
