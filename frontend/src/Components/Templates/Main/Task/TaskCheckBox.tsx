import { HTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";

export default function TaskCheckBox({
    ...rest
}: HTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...rest}
            className={twMerge(
                "w-6 h-6 bg-transparent outline-none border-2 dark:border-neutral-300 rounded",
                rest.className
            )}
            type="checkbox"
            id={useId()}
        />
    );
}
