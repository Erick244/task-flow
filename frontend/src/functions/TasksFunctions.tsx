import { TaskModel } from "@/models/Task.model";

export function filterTasksByTaskColumnId(
    tasks: TaskModel[],
    taskColumnId: number
): TaskModel[] {
    return tasks.filter((task) => task.taskColumnId === taskColumnId);
}
