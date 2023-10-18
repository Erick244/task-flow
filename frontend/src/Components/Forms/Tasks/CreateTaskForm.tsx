"use client";
import { Form } from "@/Components/Templates/Form";
import { PlusIcon } from "@/Components/Utils/Icons";
import { taskFormStateAtom } from "@/atomns/StateAtoms";
import { useTaskFlowDndContext } from "@/contexts/dnd/TaskFlowDndContext";
import { postApiData } from "@/functions/ApiFunctions";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CREATE_TASK_SCHEMA = z.object({
    goal: z.string().nonempty(),
    description: z.string().max(150).nullable(),
});

type CreateTaskFormData = z.infer<typeof CREATE_TASK_SCHEMA>;

export default function CreateTaskForm() {
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
    } = useForm<CreateTaskFormData>({
        resolver: zodResolver(CREATE_TASK_SCHEMA),
    });

    const { fetchTasks } = useTaskFlowDndContext();

    async function handleCreateTask(createTaskFormData: CreateTaskFormData) {
        const createTaskData = {
            taskColumnId: taskColumn?.id,
            ...createTaskFormData,
        };

        await postApiData("/tasks", createTaskData);
        await fetchTasks();

        closeCreateTaskForm();
    }

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <div className="flex flex-col">
                <Form.Title title="Create Task" className="mb-5" />
                <Form.SubTitle
                    title={taskColumn?.title || ""}
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
