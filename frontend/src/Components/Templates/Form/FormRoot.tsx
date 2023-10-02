import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormRootProps extends HTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
}

export default function FormRoot({ children, ...rest }: FormRootProps) {
    return (
        <form
            {...rest}
            className={twMerge("flex flex-col gap-5", rest.className)}
        >
            {children}
        </form>
    );
}
