"use client";
import { postApiData } from "@/functions/ApiFunctions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { TaskModel } from "@/models/entities/Task.model";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";
import { useAuthContext } from "../auth/AuthContext";

interface TasksContextDndProps {
    tasks: TaskModel[];
    setTasks: Dispatch<SetStateAction<TaskModel[]>>;
    tasksStorage: TaskModel[] | null;
    setTasksStorage: Dispatch<SetStateAction<TaskModel[] | null>>;
    tasksStorageLoading: boolean;
    fetchTasksInDnd: () => Promise<void>;
    loadingTasks: boolean;
    updateTasksInDnd: (tasks: TaskModel[]) => void;
}

const TasksContextDnd = createContext({} as TasksContextDndProps);

export default function TasksContextDndProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true);

    const { user } = useAuthContext();

    const tasksLocalStorageKey = `tasks_order_${user?.id}`;
    const [tasksStorage, setTasksStorage, tasksStorageLoading] =
        useLocalStorage<TaskModel[]>(tasksLocalStorageKey, []);

    const tasksStorageIds = tasksStorage?.map((task) => task.id);

    async function fetchTasksInDnd() {
        try {
            const tasksData = await postApiData<TaskModel[]>("/tasks/sync", {
                tasksIds: tasksStorageIds,
            });

            syncTasksInLocalStorage(tasksData);

            setLoadingTasks(false);
        } catch (e) {
            console.error(e);
        }
    }

    function updateTasksInDnd(tasks: TaskModel[]) {
        setTasksStorage(tasks);
        setTasks(tasks);
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

    return (
        <TasksContextDnd.Provider
            value={{
                tasks,
                setTasks,
                tasksStorage,
                setTasksStorage,
                tasksStorageLoading,
                fetchTasksInDnd,
                loadingTasks,
                updateTasksInDnd,
            }}
        >
            {children}
        </TasksContextDnd.Provider>
    );
}

export const useTasksContextDnd = () => useContext(TasksContextDnd);
