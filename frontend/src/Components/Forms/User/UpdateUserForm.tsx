"use client";
import { Form } from "@/Components/Templates/Form";
import { EditIcon } from "@/Components/Utils/Icons";
import { updateUserFormVisibilityAtom } from "@/atomns/VisibilityAtoms";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import { patchApiData } from "@/functions/ApiFunctions";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { UserModel } from "@/models/entities/User.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const UPDATE_USER_SCHEMA = z.object({
    username: z.string().min(3).max(20),
    avatarFile: z.any().nullable(),
});

type UpdateUserFormData = z.infer<typeof UPDATE_USER_SCHEMA>;

export function UpdateUserForm() {
    const { user, setUser } = useAuthContext();
    const setUpdateUserFormVisibility = useSetAtom(
        updateUserFormVisibilityAtom
    );

    function closeUpdateUserForm() {
        setUpdateUserFormVisibility(false);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(UPDATE_USER_SCHEMA),
        values: {
            username: user?.username ?? "",
        },
    });

    if (!user) return <p>Loading....</p>; //TODO: Skeleton

    const { email, avatarUrl, username } = user;

    async function handleUpdateUser(updateUserFormData: UpdateUserFormData) {
        if (!user?.id) return;

        const { username, avatarFile } = updateUserFormData;
        const image = avatarFile[0];
        const avatarUrl = image ? URL.createObjectURL(avatarFile[0]) : null;

        const updateUserData = {
            username,
            avatarUrl,
        };
        await patchApiData("/users", updateUserData);

        const updatedUser: UserModel | null = {
            ...user,
            ...updateUserData,
        };

        setUser(updatedUser);
        closeUpdateUserForm();

        toast("Profile updated", {
            type: "success",
            theme: "dark",
            position: "top-center",
        });
    }

    const disableLabelAnimation = !!username;

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <Form.Title title="Edit Profile" className="mb-10" />
            <Form.Root onSubmit={handleSubmit(handleUpdateUser)}>
                <Form.Input
                    label="Username"
                    register={register("username")}
                    disableLabelAnimation={disableLabelAnimation}
                />

                {errors?.username && (
                    <Form.AlertMessage>
                        {errors.username.message}
                    </Form.AlertMessage>
                )}

                <Form.Avatar.Root
                    className="flex items-center justify-center"
                    register={register("avatarFile")}
                >
                    <Form.Avatar.AvatarPreview
                        email={email}
                        avatarUrl={avatarUrl}
                    />
                </Form.Avatar.Root>

                <div className="flex justify-between mt-5">
                    <Form.ActionButton
                        label="Cancel"
                        onClick={closeUpdateUserForm}
                    />
                    <Form.SubmitButton
                        className="bg-blue-500 hover:bg-blue-600"
                        label="Edit"
                        icon={EditIcon}
                    />
                </div>
            </Form.Root>
        </Form.Container>
    );
}
