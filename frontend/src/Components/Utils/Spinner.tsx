import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Spinner(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={twMerge(
                "inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-gray-400",
                props.className
            )}
            role="status"
        ></div>
    );
}
