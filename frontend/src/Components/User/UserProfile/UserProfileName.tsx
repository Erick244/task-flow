import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface UserProfileNameProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
}

export default function UserProfileName({
    name,
    ...rest
}: UserProfileNameProps) {
    return (
        <div
            {...rest}
            className={twMerge(
                "w-24 sm:w-32 overflow-hidden text-ellipsis whitespace-nowrap dark:text-white text-neutral-600",
                rest.className
            )}
        >
            {name}
        </div>
    );
}
