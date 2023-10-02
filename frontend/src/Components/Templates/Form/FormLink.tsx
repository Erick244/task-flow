import { HTMLAttributes } from "react";

interface FormLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
}

export default function FormLink({ children, ...rest }: FormLinkProps) {
    return (
        <a {...rest} className="text-blue-600 cursor-pointer hover:underline">
            {children}
        </a>
    );
}
