import { UserProfile } from "@/Components/User/UserProfile";
import { twMerge } from "tailwind-merge";

import { UserProfileGravatarProps } from "@/Components/User/UserProfile/UserProfileGravatar";

interface FormAvatarImagePreviewProps extends UserProfileGravatarProps {
    avatarUrl?: string | null;
    width?: number;
    heigth?: number;
}

export function FormAvatarImagePreview({
    avatarUrl,
    email,
    className,
    width,
    heigth,
    size,
    ...rest
}: FormAvatarImagePreviewProps) {
    const DEFAULT_SIZE = 100;

    return (
        <div
            className={twMerge(
                "border-2 border-blue-500 rounded-full",
                className
            )}
        >
            {avatarUrl ? (
                <UserProfile.Image
                    {...rest}
                    width={width ?? DEFAULT_SIZE}
                    heigth={heigth ?? DEFAULT_SIZE}
                    avatarUrl={avatarUrl}
                />
            ) : (
                <UserProfile.Gravatar
                    {...rest}
                    size={size ?? DEFAULT_SIZE}
                    email={email}
                />
            )}
        </div>
    );
}
