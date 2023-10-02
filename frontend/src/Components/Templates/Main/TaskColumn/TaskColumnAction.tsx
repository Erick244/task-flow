import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TaskColumnActionProps extends HTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element;
}

export default function TaskColumnAction({
    icon,
    ...rest
}: TaskColumnActionProps) {
    return (
        <button
            {...rest}
            className={twMerge(
                "p-1 dark:text-white text-neutral-600 dark:bg-neutral-500 bg-neutral-200 dark:hover:bg-neutral-600 hover:bg-neutral-300",
                rest.className
            )}
        >
            {icon}
        </button>
    );
}
