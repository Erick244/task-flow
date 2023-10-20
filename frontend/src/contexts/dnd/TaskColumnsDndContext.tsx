import { postApiData } from "@/functions/ApiFunctions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import { SetStateAction } from "jotai";
import { Dispatch, createContext, useContext, useState } from "react";
import { useAuthContext } from "../auth/AuthContext";

interface TaskColumnsDndContextProps {
    taskColumns: TaskColumnModel[];
    setTaskColumns: Dispatch<SetStateAction<TaskColumnModel[]>>;
    taskColumnsStorage: TaskColumnModel[] | null;
    setTaskColumnsStorage: (taskColumn: TaskColumnModel[]) => void;
    taskColumnsStorageLoading: boolean;
    fetchTaskColumnsInDnd: () => Promise<void>;
    loadingTaskColumns: boolean;
    updateTasksColumnsInDnd: (taskColumns: TaskColumnModel[]) => void;
}

const TaskColumnsDndContext = createContext({} as TaskColumnsDndContextProps);

export default function TaskColumnsDndContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [taskColumns, setTaskColumns] = useState<TaskColumnModel[]>([]);
    const [loadingTaskColumns, setLoadingTaskColumns] = useState<boolean>(true);

    const { user } = useAuthContext();

    const taskColumnsLocalStorageKey = `task_columns_order_${user?.id}`;
    const [
        taskColumnsStorage,
        setTaskColumnsStorage,
        taskColumnsStorageLoading,
    ] = useLocalStorage<TaskColumnModel[]>(taskColumnsLocalStorageKey, []);

    const taskColumnsStorageIds = taskColumnsStorage?.map(
        (taskColumn) => taskColumn.id
    );

    async function fetchTaskColumnsInDnd() {
        try {
            const taskColumnsData = await postApiData<TaskColumnModel[]>(
                "/taskColumns/sync",
                {
                    taskColumnsIds: taskColumnsStorageIds,
                }
            );

            syncTaskColumnsInLocalStorage(taskColumnsData);

            setLoadingTaskColumns(false);
        } catch (e) {
            console.error(e);
        }
    }

    function updateTasksColumnsInDnd(taskColumns: TaskColumnModel[]) {
        setTaskColumnsStorage(taskColumns);
        setTaskColumns(taskColumns);
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

    return (
        <TaskColumnsDndContext.Provider
            value={{
                setTaskColumns,
                taskColumns,
                setTaskColumnsStorage,
                taskColumnsStorage,
                taskColumnsStorageLoading,
                fetchTaskColumnsInDnd,
                loadingTaskColumns,
                updateTasksColumnsInDnd,
            }}
        >
            {children}
        </TaskColumnsDndContext.Provider>
    );
}

export const useTaskColumnsDndContext = () => useContext(TaskColumnsDndContext);
