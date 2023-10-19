import { z } from "zod";

const SAVE_TASK_SCHEMA = z.object({
    goal: z.string().nonempty(),
    description: z.string().max(150).nullable(),
});

type SaveTaskFormData = z.infer<typeof SAVE_TASK_SCHEMA>;

export { SAVE_TASK_SCHEMA };
export type { SaveTaskFormData };
