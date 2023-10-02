import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormActionButtonProps extends HTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: JSX.Element;
}

export default function FormActionButton({
    label,
    icon,
    ...rest
}: FormActionButtonProps) {
    return (
        <button
            {...rest}
            type="button"
            className={twMerge(
                "flex justify-between items-center dark:bg-neutral-600 dark:hover:bg-neutral-500 text-white bg-neutral-500 hover:bg-neutral-600 gap-2 px-3 py-2 shadow-md shadow-black/30 rounded",
                rest.className
            )}
        >
            {label} {icon && <i>{icon}</i>}
        </button>
    );
}
