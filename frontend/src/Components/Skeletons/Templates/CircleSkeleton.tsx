import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function CircleSkeleton(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={twMerge(
                "rounded-full animate-pulse bg-zinc-500 p-4",
                props.className
            )}
        ></div>
    );
}
