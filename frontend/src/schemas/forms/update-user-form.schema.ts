import { z } from "zod";

const UPDATE_USER_SCHEMA = z.object({
    username: z.string().min(3).max(20),
    avatarFile: z.any().nullable(),
});

type UpdateUserFormData = z.infer<typeof UPDATE_USER_SCHEMA>;

export { UPDATE_USER_SCHEMA };
export type { UpdateUserFormData };
