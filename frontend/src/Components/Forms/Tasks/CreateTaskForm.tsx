"use client";
import { Form } from "@/Components/Templates/Form";
import { PlusIcon } from "@/Components/Utils/Icons";
import { taskFormStateAtom } from "@/atomns/StateAtoms";
import { useTasksDndContext } from "@/contexts/dnd/TasksDndContext";
import { postApiData } from "@/functions/ApiFunctions";
import { defaultToast } from "@/functions/DefaultToasts";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import {
    SAVE_TASK_SCHEMA,
    SaveTaskFormData,
} from "@/schemas/forms/save-task-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

export default function CreateTaskForm() {
    const {
        closeCreateTaskForm,
        disableLabelAnimation,
        errors,
        handleCreateTask,
        handleSubmit,
        register,
        taskColumn,
    } = useCreateTaskForm();

    if (!taskColumn) return <p>Loading....</p>; //TODO: Skeleton

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <div className="flex flex-col">
                <Form.Title title="Create Task" className="mb-5" />
                <Form.SubTitle
                    title={taskColumn.title}
                    className="mb-10 self-center"
                />
            </div>
            <Form.Root onSubmit={handleSubmit(handleCreateTask)}>
                <Form.Input
                    register={register("goal")}
                    label="Goal"
                    disableLabelAnimation={disableLabelAnimation}
                />

                {errors.goal && (
                    <Form.AlertMessage>{errors.goal.message}</Form.AlertMessage>
                )}

                <Form.TextArea
                    register={register("description")}
                    label="Description (Optional)"
                    maxLength={150}
                    placeholder="Create a description for your goal, ex: Drinking water..."
                />

                {errors.description && (
                    <Form.AlertMessage>
                        {errors.description.message}
                    </Form.AlertMessage>
                )}

                <div className="flex justify-between mt-5">
                    <Form.ActionButton
                        label="Cancel"
                        onClick={closeCreateTaskForm}
                    />
                    <Form.SubmitButton
                        className="bg-blue-500 hover:bg-blue-600"
                        label="Create"
                        icon={PlusIcon}
                    />
                </div>
            </Form.Root>
        </Form.Container>
    );
}

function useCreateTaskForm() {
    const [taskFormState, setTaskFormState] = useAtom(taskFormStateAtom);
    const { taskColumn, task } = taskFormState;

    function closeCreateTaskForm() {
        setTaskFormState({
            ...taskFormState,
            visibility: false,
        });
    }

    const disableLabelAnimation = !!task?.goal;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SaveTaskFormData>({
        resolver: zodResolver(SAVE_TASK_SCHEMA),
    });

    const { fetchTasksInDnd } = useTasksDndContext();

    async function handleCreateTask(createTaskFormData: SaveTaskFormData) {
        const createTaskData = {
            taskColumnId: taskColumn?.id,
            ...createTaskFormData,
        };

        await postApiData("/tasks", createTaskData);
        await fetchTasksInDnd();

        closeCreateTaskForm();
        defaultToast("Task created", "success");
    }

    return {
        taskColumn,
        handleSubmit,
        closeCreateTaskForm,
        register,
        handleCreateTask,
        errors,
        disableLabelAnimation,
    };
}
