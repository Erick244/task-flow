import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    title: string;
}

export default function FormTitle({ title, ...rest }: FormTitleProps) {
    return (
        <h1
            {...rest}
            className={twMerge(
                "text-xl text-center dark:bg-neutral-600 bg-neutral-200 text-neutral-600 shadow-md shadow-black/10 rounded p-2 dark:text-white font-mono",
                rest.className
            )}
        >
            {title}
        </h1>
    );
}
