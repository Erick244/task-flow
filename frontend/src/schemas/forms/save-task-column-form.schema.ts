import { z } from "zod";

const SAVE_TASK_COLUMN_SCHEMA = z.object({
    title: z.string().min(3).nonempty(),
});

type SaveTaskColumnFormData = z.infer<typeof SAVE_TASK_COLUMN_SCHEMA>;

export { SAVE_TASK_COLUMN_SCHEMA };
export type { SaveTaskColumnFormData };
