import { TaskModel } from "@/models/Task.model";
import { TaskColumnModel } from "@/models/TaskColumn.model";
import { filterTasksByTaskColumnId } from "@/utils/functions";
import { DragOverlay } from "@dnd-kit/core";
import DndTask from "./Task/DndTask";
import DndTaskColumn from "./TaskColumn/DndTaskColumn";

interface DndDragOverlayProps {
    activeTaskColumn: TaskColumnModel | null;
    activeTask: TaskModel | null;
    tasks: TaskModel[];
}

export default function DndDragOverlay({
    activeTask,
    activeTaskColumn,
    tasks,
}: DndDragOverlayProps) {
    return (
        <DragOverlay>
            {activeTaskColumn && (
                <DndTaskColumn
                    tasks={filterTasksByTaskColumnId(
                        tasks,
                        activeTaskColumn.id
                    )}
                    taskColumn={activeTaskColumn}
                />
            )}
            {activeTask && <DndTask task={activeTask} />}
        </DragOverlay>
    );
}
