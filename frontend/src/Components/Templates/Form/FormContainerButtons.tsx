import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormContainerButtonsProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function FormContainerButtons({
    children,
    ...rest
}: FormContainerButtonsProps) {
    return (
        <div
            {...rest}
            className={twMerge(
                "flex justify-between gpa-2 mt-5",
                rest.className
            )}
        >
            {children}
        </div>
    );
}
