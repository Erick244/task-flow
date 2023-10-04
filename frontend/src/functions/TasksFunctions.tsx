import { TaskModel } from "@/models/entities/Task.model";

export function filterTasksByTaskColumnId(
    tasks: TaskModel[],
    taskColumnId: number
): TaskModel[] {
    return tasks.filter((task) => task.taskColumnId === taskColumnId);
}
