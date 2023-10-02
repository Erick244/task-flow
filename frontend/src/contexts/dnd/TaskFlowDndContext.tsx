"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DndTypes } from "@/models/DndTypes.enum";
import { TaskModel } from "@/models/Task.model";
import { TaskColumnModel } from "@/models/TaskColumn.model";
import { BASE_API_URL, TEMP_BEARER_TOKEN } from "@/utils/constants";
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
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface TaskFlowDndContextProps {
    tasks: TaskModel[];
    taskColumns: TaskColumnModel[];
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
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true);

    const [taskColumns, setTaskColumns] = useState<TaskColumnModel[]>([]);
    const [loadingTaskColumns, setLoadingTaskColumns] = useState<boolean>(true);

    const [tasksStorage, setTasksStorage, tasksStorageLoading] =
        useLocalStorage<TaskModel[]>("tasks", []);

    const [taskColumnsStorage, setTaskColumnsStorage, taskColumnsLoading] =
        useLocalStorage<TaskColumnModel[]>("taskColumns", []);

    function setInitialValueInTasksAndTaskColumns() {
        setTasks(tasksStorage ?? []);

        setTaskColumns(taskColumnsStorage ?? []);
    }

    useEffect(() => {
        setInitialValueInTasksAndTaskColumns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tasksStorageIds = tasksStorage?.map((task) => task.id);
    const taskColumnsStorageIds = taskColumnsStorage?.map(
        (taskColumn) => taskColumn.id
    );

    async function fetchTasks() {
        try {
            const resp = await axios.post(
                `${BASE_API_URL}/tasks/sync`,
                {
                    userId: 1,
                    tasksIds: tasksStorageIds,
                },
                { headers: { Authorization: TEMP_BEARER_TOKEN } }
            );

            const tasksData = await resp.data;

            syncTasksInLocalStorage(tasksData);

            setLoadingTasks(false);
        } catch (e) {
            console.error(e);
        }
    }

    function syncTasksInLocalStorage(tasksData: TaskModel[]) {
        const existTasksStorageIds = Array.isArray(tasksStorageIds);

        if (existTasksStorageIds) {
            setTasksStorage([...(tasksStorage ?? []), ...tasksData]);
            setTasks([...(tasksStorage ?? []), ...tasksData]);
        } else {
            setTasksStorage(tasksData);
            setTasks(tasksData);
        }
    }

    async function fetchTaskColumns() {
        try {
            const resp = await axios.post(
                `${BASE_API_URL}/taskColumns/sync`,
                {
                    userId: 1,
                    taskColumnsIds: taskColumnsStorageIds,
                },
                { headers: { Authorization: TEMP_BEARER_TOKEN } }
            );

            const taskColumnsData = await resp.data;

            syncTaskColumnsInLocalStorage(taskColumnsData);

            setLoadingTaskColumns(false);
        } catch (e) {
            console.error(e);
        }
    }

    function syncTaskColumnsInLocalStorage(taskColumnsData: TaskColumnModel[]) {
        const existTaskColumnsStorageIds = Array.isArray(taskColumnsStorageIds);

        if (existTaskColumnsStorageIds) {
            setTaskColumnsStorage([
                ...(taskColumnsStorage ?? []),
                ...taskColumnsData,
            ]);
            setTaskColumns([...(taskColumnsStorage ?? []), ...taskColumnsData]);
        } else {
            setTaskColumnsStorage(taskColumnsData);
            setTaskColumns(taskColumnsData);
        }
    }

    useEffect(() => {
        if (!tasksStorageLoading) {
            fetchTasks();
        }

        if (!taskColumnsLoading) {
            fetchTaskColumns();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasksStorageLoading, taskColumnsLoading]);

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

    function findIndexById(
        items: TaskModel[] | TaskColumnModel[],
        compareId: number
    ) {
        return items.findIndex((item) => compareId === item.id);
    }

    function getNumberIdInDdn(dndId: string | number) {
        const selectIdNumberRegex = /[ ][-][ ]\b[^\d\s-]+\b/; // '1' - Text
        return Number(dndId.toString().replace(selectIdNumberRegex, " "));
    }

    return (
        <TaskFlowDndContext.Provider
            value={{
                taskColumns,
                tasks,
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
