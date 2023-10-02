import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormSubTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    title: string;
}

export default function FormSubTitle({ title, ...rest }: FormSubTitleProps) {
    return (
        <h2
            {...rest}
            className={twMerge(
                "w-[80%] overflow-hidden text-center text-ellipsis whitespace-nowrap text-lg text-white bg-blue-500 shadow-md shadow-black/10 rounded p-2  font-mono",
                rest.className
            )}
        >
            {title}
        </h2>
    );
}
