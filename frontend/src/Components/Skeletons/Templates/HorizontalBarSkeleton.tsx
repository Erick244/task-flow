import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function HorizontalBarSkeleton(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={twMerge(
                "bg-zinc-500 animate-pulse p-2 w-14",
                props.className
            )}
        ></div>
    );
}
