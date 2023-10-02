import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FloatMenuItemProps extends HTMLAttributes<HTMLButtonElement> {
    label: string;
    icon: JSX.Element;
}

export default function FloatMenuItem({
    icon,
    label,
    ...rest
}: FloatMenuItemProps) {
    return (
        <button
            {...rest}
            className={twMerge(
                "sm:text-sm p-1 flex justify-between items-center gap-2 border rounded dark:text-white/50 text-black/50 dark:bg-neutral-700 bg-neutral-400 shadow-md shadow-black/30",
                rest.className
            )}
        >
            <span className="sm:block hidden">{label}</span>
            <i>{icon}</i>
        </button>
    );
}
