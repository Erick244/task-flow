import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface UserProfileRootProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function UserProfileRoot({
    children,
    ...rest
}: UserProfileRootProps) {
    return (
        <div {...rest} className={twMerge("flex items-center", rest.className)}>
            {children}
        </div>
    );
}
