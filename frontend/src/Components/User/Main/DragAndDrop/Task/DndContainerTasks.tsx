"use client";
import { TaskModel } from "@/models/entities/Task.model";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import DndTask from "./DndTask";

interface DndContainerTasksProps {
    tasks: TaskModel[];
}

export default function DndContainerTasks({ tasks }: DndContainerTasksProps) {
    const taskIds = useMemo(
        () => tasks && tasks.map((task) => `${task.id} - Task`),
        [tasks]
    );

    return (
        <SortableContext items={taskIds}>
            {tasks &&
                tasks.map((task) => {
                    return <DndTask key={task.id} task={task} />;
                })}
        </SortableContext>
    );
}
