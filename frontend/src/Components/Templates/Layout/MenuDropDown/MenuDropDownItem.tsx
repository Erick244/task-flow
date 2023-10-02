import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface MenuDropDownItemProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    icon: JSX.Element;
}

export default function MenuDropDownItem({
    icon,
    title,
    ...rest
}: MenuDropDownItemProps) {
    return (
        <div
            {...rest}
            className={twMerge(
                "flex justify-between items-center border-2 p-3 cursor-pointer rounded-lg",
                rest.className
            )}
        >
            <h2>{title}</h2> <i>{icon}</i>
        </div>
    );
}
