import { HTMLAttributes } from "react";

interface FormAlertMessageProps extends HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

export default function FormAlertMessage({
    children,
    ...rest
}: FormAlertMessageProps) {
    return (
        <span {...rest} className="text-red-500 text-sm">
            {children}
        </span>
    );
}
