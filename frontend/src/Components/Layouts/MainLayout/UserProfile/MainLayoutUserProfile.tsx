import { UserProfile } from "@/Components/User/UserProfile";

export default function MainLayoutUserProfile() {
    return (
        <UserProfile.Root className="gap-2">
            {/* <UserProfile.Image avatarUrl="https://github.com/Erick244.png" /> */}
            <UserProfile.Gravatar email="erick@dev.com" />
            <UserProfile.Name name="Erick dwad wa dawd aw daw dwad awdwa dawdaw da dwad aw dawdaw dw" />
        </UserProfile.Root>
    );
}
