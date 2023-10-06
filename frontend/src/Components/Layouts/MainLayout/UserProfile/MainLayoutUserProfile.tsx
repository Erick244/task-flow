"use client";
import { UserProfile } from "@/Components/User/UserProfile";
import { useAuthContext } from "@/contexts/auth/AuthContext";

export default function MainLayoutUserProfile() {
    const { user } = useAuthContext();

    if (!user) return <p>Loading userprofile....</p>; //TODO: Skeleton

    const { avatarUrl, email, username } = user;

    return (
        <UserProfile.Root className="gap-2">
            {avatarUrl ? (
                <UserProfile.Image avatarUrl={avatarUrl} />
            ) : (
                <UserProfile.Gravatar email={email} />
            )}
            <UserProfile.Name name={username} />
        </UserProfile.Root>
    );
}
