import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface MenuDropDownActionProps extends HTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element;
}

export default function MenuDropDownAction({
    icon,
    ...rest
}: MenuDropDownActionProps) {
    return (
        <button
            {...rest}
            className={twMerge(
                "p-1 dark:text-white shadow-sm shadow-black/30 hover:scale-105 text-neutral-600 dark:bg-neutral-500 bg-neutral-200 rounded",
                rest.className
            )}
        >
            {icon}
        </button>
    );
}
