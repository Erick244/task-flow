"use client";
import { UserProfileSkeleton } from "@/Components/Skeletons/Components/UserProfileSkeleton";
import { UserProfile } from "@/Components/User/UserProfile";
import { updateUserFormVisibilityAtom } from "@/atomns/VisibilityAtoms";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import { useSetAtom } from "jotai";

export default function MainLayoutUserProfile() {
    const { user } = useAuthContext();
    const setUpdateUserFormVisibility = useSetAtom(
        updateUserFormVisibilityAtom
    );

    if (!user) return <UserProfileSkeleton />;

    const { avatarUrl, email, username } = user;

    function toggleUpdateUserFormVisibility() {
        setUpdateUserFormVisibility((isVisible) => !isVisible);
    }

    return (
        <UserProfile.Root
            className="gap-2 cursor-pointer hover:opacity-80"
            onClick={toggleUpdateUserFormVisibility}
        >
            {avatarUrl ? (
                <UserProfile.Image avatarUrl={avatarUrl} />
            ) : (
                <UserProfile.Gravatar email={email} />
            )}
            <UserProfile.Name name={username} />
        </UserProfile.Root>
    );
}
