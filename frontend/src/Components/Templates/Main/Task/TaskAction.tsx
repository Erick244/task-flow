import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TaskActionProps extends HTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element;
}

export default function TaskAction({ icon, ...rest }: TaskActionProps) {
    return (
        <button
            {...rest}
            className={twMerge(
                "p-1 dark:text-white shadow-sm shadow-black/30 text-neutral-600 dark:bg-neutral-500 bg-neutral-200 rounded hover:scale-105",
                rest.className
            )}
        >
            {icon}
        </button>
    );
}
