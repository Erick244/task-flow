"use client";
import { patchApiData } from "@/functions/ApiFunctions";
import { TaskModel } from "@/models/entities/Task.model";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import { DndTypes } from "@/models/enums/DndTypes.enum";
import {
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    MouseSensor,
    SensorDescriptor,
    SensorOptions,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createContext, useContext, useEffect, useState } from "react";
import { useTaskColumnsDndContext } from "./TaskColumnsDndContext";
import { useTasksDndContext } from "./TasksDndContext";

interface TaskFlowDndContextProps {
    dataFetchingIsLoading: boolean;
    activeTaskColumn: TaskColumnModel | null;
    activeTask: TaskModel | null;
    handlerOnDragEnd: (event: DragEndEvent) => void;
    handlerOnDragOver: (event: DragOverEvent) => void;
    handlerOnDragStart: (event: DragStartEvent) => void;
    sensors: SensorDescriptor<SensorOptions>[];
}

const TaskFlowDndContext = createContext({} as TaskFlowDndContextProps);

export default function TaskFlowDndContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        setTasks,
        setTasksStorage,
        tasksStorage,
        tasksStorageLoading,
        fetchTasksInDnd,
        loadingTasks,
    } = useTasksDndContext();

    const {
        setTaskColumns,
        setTaskColumnsStorage,
        taskColumnsStorage,
        taskColumnsStorageLoading,
        fetchTaskColumnsInDnd,
        loadingTaskColumns,
    } = useTaskColumnsDndContext();

    function setInitialValueInTasksAndTaskColumns() {
        setTasks(tasksStorage ?? []);

        setTaskColumns(taskColumnsStorage ?? []);
    }

    useEffect(() => {
        setInitialValueInTasksAndTaskColumns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!tasksStorageLoading) {
            fetchTasksInDnd();
        }

        if (!taskColumnsStorageLoading) {
            fetchTaskColumnsInDnd();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasksStorageLoading, taskColumnsStorageLoading]);

    const dataFetchingIsLoading = loadingTasks || loadingTaskColumns;

    const [activeTaskColumn, setActiveTaskColumn] =
        useState<TaskColumnModel | null>(null);

    const [activeTask, setActiveTask] = useState<TaskModel | null>(null);

    const sensors = useSensors(
        useSensor(TouchSensor, {
            activationConstraint: { delay: 250, tolerance: 5 },
        }),
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    );

    function handlerOnDragStart(event: DragStartEvent) {
        const activeType = event.active.data.current?.type;

        setActiveItem(activeType, event);
    }

    function setActiveItem(activeType: DndTypes, event: DragStartEvent) {
        if (activeType === DndTypes.TASK_COLUMN) {
            const activeTaskColumnData = event.active.data.current?.taskColumn;
            setActiveTaskColumn(activeTaskColumnData);
        }

        if (activeType === DndTypes.TASK) {
            const activeTaskData = event.active.data.current?.task;
            setActiveTask(activeTaskData);
        }
    }

    function handlerOnDragEnd(event: DragEndEvent) {
        resetActiveItems();

        const { active, over } = event;

        if (!over) return;

        const activeType = active.data.current?.type;
        const overType = over.data.current?.type;

        const activeId = getNumberIdInDdn(active.id);
        const overId = getNumberIdInDdn(over.id);

        if (activeId === overId) return;

        const isActiveTaskColumn = activeType === DndTypes.TASK_COLUMN;
        const isOverTaskColumn = overType === DndTypes.TASK_COLUMN;

        const moveTaskColumns = isActiveTaskColumn && isOverTaskColumn;

        if (moveTaskColumns) {
            setTaskColumns((taskColumns) => {
                const activeIndex = findIndexById(taskColumns, activeId);

                const overIndex = findIndexById(taskColumns, overId);

                const newArrayMoved = arrayMove(
                    taskColumns,
                    activeIndex,
                    overIndex
                );

                setTaskColumnsStorage(newArrayMoved);

                return newArrayMoved;
            });
        }
    }

    function getNumberIdInDdn(dndId: string | number) {
        const selectIdNumberRegex = /[ ][-][ ]\b[^\d\s-]+\b/; // '1' - Text
        return Number(dndId.toString().replace(selectIdNumberRegex, " "));
    }

    function findIndexById(
        items: TaskModel[] | TaskColumnModel[],
        compareId: number
    ) {
        return items.findIndex((item) => compareId === item.id);
    }

    function resetActiveItems() {
        setActiveTask(null);
        setActiveTaskColumn(null);
    }

    function handlerOnDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (!over) return;

        const activeType = active.data.current?.type;
        const overType = over.data.current?.type;

        const activeId = getNumberIdInDdn(active.id);
        const overId = getNumberIdInDdn(over.id);

        const isActiveTask = activeType === DndTypes.TASK;
        const isOverTask = overType === DndTypes.TASK;

        if (!isActiveTask) return;

        const moveTasks = isActiveTask && isOverTask;

        if (moveTasks) {
            setTasks((tasks) => {
                const activeIndex = findIndexById(tasks, activeId);

                const overIndex = findIndexById(tasks, overId);

                const overTaskColumnId = tasks[overIndex].taskColumnId;
                tasks[activeIndex].taskColumnId = overTaskColumnId;

                const currentTaskId = tasks[activeIndex].id;
                patchApiData(`/tasks/${currentTaskId}`, {
                    taskColumnId: overTaskColumnId,
                });

                const newArrayMoved = arrayMove(tasks, activeIndex, overIndex);

                setTasksStorage(newArrayMoved);

                return newArrayMoved;
            });
        }

        const isOverTaskColumn = overType === DndTypes.TASK_COLUMN;

        const moveTaskToOverTaskColumn = isActiveTask && isOverTaskColumn;

        if (moveTaskToOverTaskColumn) {
            setTasks((tasks) => {
                const activeIndex = findIndexById(tasks, activeId);

                tasks[activeIndex].taskColumnId = overId;

                const currentTaskId = tasks[activeIndex].id;
                patchApiData(`/tasks/${currentTaskId}`, {
                    taskColumnId: overId,
                });

                const newArrayMoved = arrayMove(
                    tasks,
                    activeIndex,
                    activeIndex
                );

                setTasksStorage(newArrayMoved);

                return newArrayMoved;
            });
        }
    }

    return (
        <TaskFlowDndContext.Provider
            value={{
                dataFetchingIsLoading,
                activeTask,
                activeTaskColumn,
                handlerOnDragEnd,
                handlerOnDragOver,
                handlerOnDragStart,
                sensors,
            }}
        >
            {children}
        </TaskFlowDndContext.Provider>
    );
}

export const useTaskFlowDndContext = () => useContext(TaskFlowDndContext);
