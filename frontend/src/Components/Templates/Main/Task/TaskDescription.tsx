import { HTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";

interface TaskDescriptionProps extends HTMLAttributes<HTMLTextAreaElement> {
    description: string | null;
    isVisible: boolean;
}

export default function TaskDescription({
    description,
    isVisible,
    ...rest
}: TaskDescriptionProps) {
    return (
        <textarea
            readOnly
            value={description ?? ""}
            className={twMerge(
                "resize-none h-full mt-5 w-full outline-none dark:text-white border-2 rounded rounded-t-none dark:border-neutral-500 border-neutral-400 dark:bg-neutral-600 bg-neutral-100",
                isVisible ? "visible opacity-100" : "invisible opacity-0",
                rest.className
            )}
            id={useId()}
        />
    );
}
