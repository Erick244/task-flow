import { AngleDownIcon } from "@/Components/Utils/Icons";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TaskToggleDescriptionProps extends HTMLAttributes<HTMLButtonElement> {
    descriptionIsVisible: boolean;
}

export default function TaskToggleDescription({
    descriptionIsVisible,
    ...rest
}: TaskToggleDescriptionProps) {
    return (
        <button
            {...rest}
            className={twMerge(
                "p-1 text-white shadow-sm shadow-black/30 hover:scale-105 bg-blue-500 rounded",
                descriptionIsVisible ? "rotate-180" : "rotate-0",
                rest.className
            )}
        >
            {AngleDownIcon}
        </button>
    );
}
