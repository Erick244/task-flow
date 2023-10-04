"use client";
import { filterTasksByTaskColumnId } from "@/functions/TasksFunctions";
import { TaskModel } from "@/models/entities/Task.model";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import DndTaskColumn from "./DndTaskColumn";

interface DndContainerTaskColumnsProps {
    taskColumns: TaskColumnModel[];
    tasks: TaskModel[];
}

export default function DndContainerTaskColumns({
    taskColumns,
    tasks,
}: DndContainerTaskColumnsProps) {
    const taskColumnIds = useMemo(
        () => taskColumns?.map((taskColumn) => `${taskColumn.id} - TaskColumn`),
        [taskColumns]
    );

    return (
        <SortableContext items={taskColumnIds}>
            {taskColumns &&
                taskColumns.map((taskColumn) => {
                    return (
                        <DndTaskColumn
                            tasks={filterTasksByTaskColumnId(
                                tasks,
                                taskColumn.id
                            )}
                            key={taskColumn.id}
                            taskColumn={taskColumn}
                        />
                    );
                })}
        </SortableContext>
    );
}
