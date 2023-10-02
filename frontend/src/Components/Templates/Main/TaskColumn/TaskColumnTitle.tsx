import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TaskColumnTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    title: string;
}

export default function TaskColumnTitle({
    title,
    ...rest
}: TaskColumnTitleProps) {
    return (
        <h1
            {...rest}
            className={twMerge(
                "dark:bg-neutral-500 bg-neutral-200 font-semibold p-2 dark:text-white text-neutral-600 shadow-sm shadow-black/20",
                rest.className
            )}
        >
            {title}
        </h1>
    );
}
