import { filterTasksByTaskColumnId } from "@/functions/TasksFunctions";
import { TaskModel } from "@/models/entities/Task.model";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
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
