import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CaractereCountProps extends HTMLAttributes<HTMLDivElement> {
    textLength: number;
    limit: number;
}

export default function CaractereCount({
    limit,
    textLength,
    ...rest
}: CaractereCountProps) {
    return (
        <div
            {...rest}
            className={twMerge(
                "absolute text-blue-500 text-sm",
                rest.className
            )}
        >
            {limit}/{textLength}
        </div>
    );
}
