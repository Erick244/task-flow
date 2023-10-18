"use client";
import { HTMLAttributes } from "react";
import Gravatar from "react-gravatar";
import { twMerge } from "tailwind-merge";

export interface UserProfileGravatarProps
    extends HTMLAttributes<HTMLDivElement> {
    email: string;
    size?: number;
}

export default function UserProfileGravatar({
    email,
    size,
    className,
    ...rest
}: UserProfileGravatarProps) {
    return (
        <div {...rest}>
            <Gravatar
                alt="User Gravatar"
                email={email}
                size={size ?? 40}
                className={twMerge("rounded-full", className)}
            />
        </div>
    );
}
