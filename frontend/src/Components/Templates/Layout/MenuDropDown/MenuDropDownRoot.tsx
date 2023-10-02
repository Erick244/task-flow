import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface MenuDropDownRootProps extends HTMLAttributes<HTMLMenuElement> {
    children: React.ReactNode;
}

export default function MenuDropDownRoot({
    children,
    ...rest
}: MenuDropDownRootProps) {
    return (
        <menu
            {...rest}
            className={twMerge(
                "max-w-xs dark:bg-neutral-700 dark:text-white bg-neutral-300 p-2 rounded border-b-2 border-neutral-300",
                rest.className
            )}
        >
            {children}
        </menu>
    );
}
