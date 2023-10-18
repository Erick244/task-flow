import Image from "next/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface UserProfileImageProps extends HTMLAttributes<HTMLDivElement> {
    avatarUrl: string;
    width?: number;
    heigth?: number;
}

export default function UserProfileImage({
    avatarUrl,
    width,
    heigth,
    className,
    ...rest
}: UserProfileImageProps) {
    return (
        <div {...rest}>
            <Image
                alt="User Avatar"
                src={avatarUrl}
                width={width ?? 40}
                height={heigth ?? 40}
                className={twMerge("rounded-full", className)}
            />
        </div>
    );
}
