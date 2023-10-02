import { TaskModel } from "@/models/Task.model";
import axios from "axios";
import { MouseEvent } from "react";
import { BASE_API_URL, TEMP_BEARER_TOKEN } from "./constants";

export function filterTasksByTaskColumnId(
    tasks: TaskModel[],
    taskColumnId: number
): TaskModel[] {
    return tasks.filter((task) => task.taskColumnId === taskColumnId);
}

export function stopClickPropagation(e: MouseEvent) {
    e.stopPropagation();
}

export async function fetchData(url: string) {
    try {
        const config = {
            headers: {
                Authorization: TEMP_BEARER_TOKEN,
            },
        };

        const response = await axios.get(`${BASE_API_URL}${url}`, config);
        const data = await response.data;

        return data;
    } catch (e) {
        throw e;
    }
}
