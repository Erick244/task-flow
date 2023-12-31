"use client";
import { FormSkeleton } from "@/Components/Skeletons/Components/FormSkeleton";
import { Form } from "@/Components/Templates/Form";
import { EditIcon } from "@/Components/Utils/Icons";
import { taskFormStateAtom } from "@/atomns/StateAtoms";
import { useTasksDndContext } from "@/contexts/dnd/TasksDndContext";
import { patchApiData } from "@/functions/ApiFunctions";
import { defaultToast } from "@/functions/DefaultToasts";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { TaskModel } from "@/models/entities/Task.model";
import {
    SAVE_TASK_SCHEMA,
    SaveTaskFormData,
} from "@/schemas/forms/save-task-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

export default function EditTaskForm() {
    const {
        closeEditTaskForm,
        disableLabelAnimation,
        errors,
        handleEditTask,
        handleSubmit,
        register,
        taskColumn,
    } = useEditTaskForm();

    if (!taskColumn) return <FormSkeleton />;

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <div className="flex flex-col">
                <Form.Title title="Edit Task" className="mb-5" />
                <Form.SubTitle
                    title={taskColumn.title}
                    className="mb-10 self-center"
                />
            </div>
            <Form.Root onSubmit={handleSubmit(handleEditTask)}>
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
                    placeholder="Edit a description for your goal, ex: Drinking water..."
                />

                {errors.description && (
                    <Form.AlertMessage>
                        {errors.description.message}
                    </Form.AlertMessage>
                )}

                <div className="flex justify-between mt-5">
                    <Form.ActionButton
                        label="Cancel"
                        onClick={closeEditTaskForm}
                    />
                    <Form.SubmitButton
                        className="bg-blue-500 hover:bg-blue-600"
                        label="Edit"
                        icon={EditIcon}
                    />
                </div>
            </Form.Root>
        </Form.Container>
    );
}

function useEditTaskForm() {
    const [taskFormState, setTaskFormState] = useAtom(taskFormStateAtom);
    const { taskColumn, task } = taskFormState;

    function closeEditTaskForm() {
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
        values: {
            goal: task?.goal ?? "",
            description: task?.description ?? "",
        },
    });

    const { tasks, updateTasksInDnd } = useTasksDndContext();

    async function handleEditTask(editTaskFormData: SaveTaskFormData) {
        if (!task?.id || !taskColumn?.id) return;

        const editTask: TaskModel = {
            id: task.id,
            taskColumnId: taskColumn.id,
            isCompleted: task?.isCompleted ?? false,
            ...editTaskFormData,
        };

        const updatedTasks = tasks.map((dndTask: TaskModel) => {
            if (dndTask.id == task.id) {
                dndTask = editTask;
            }

            return dndTask;
        });

        updateTasksInDnd(updatedTasks);
        await patchApiData(`/tasks/${task?.id}`, editTaskFormData);

        closeEditTaskForm();
        defaultToast("Task edited", "success");
    }

    return {
        closeEditTaskForm,
        errors,
        register,
        disableLabelAnimation,
        taskColumn,
        handleSubmit,
        handleEditTask,
    };
}
