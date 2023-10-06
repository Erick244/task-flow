"use client";
import { Form } from "@/Components/Templates/Form";
import { PlusIcon, TrashIcon } from "@/Components/Utils/Icons";
import { taskFormStateAtom } from "@/atomns/FormsAtoms";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { FormActions } from "@/models/enums/FormActions.enum";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

export default function TaskForm() {
    const [taskFormState, setTaskFormState] = useAtom(taskFormStateAtom);
    const { taskColumn, task } = taskFormState;

    function handlerActionButton() {
        setTaskFormState({
            ...taskFormState,
            visibility: false,
        });
    }

    const formActionIsDelete = taskFormState.formAction === FormActions.DELETE;
    const disableLabelAnimation = !!task?.goal;

    const currentFormTitle = formActionIsDelete ? "Delete Task" : "Save Task";

    const currentSubmitButton = {
        label: formActionIsDelete ? "Delete" : "Save",
        icon: formActionIsDelete ? TrashIcon : PlusIcon,
        bgColor: formActionIsDelete
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    function handleFormTask(data: any) {
        console.log(data);
    }

    // TODO: Separa este formulario em 3 partes

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <Titles
                formTitle={currentFormTitle}
                taskColumnTitle={taskColumn?.title}
            />
            <Form.Root onSubmit={handleSubmit(handleFormTask)}>
                <Form.Input
                    register={register("goal")}
                    label="Goal"
                    value={task?.goal || ""}
                    disabled={formActionIsDelete}
                    disableLabelAnimation={disableLabelAnimation}
                />
                <Form.TextArea
                    register={register("description")}
                    value={task?.description || ""}
                    label="Description (Optional)"
                    maxLength={250}
                    placeholder="Create a description for your goal, ex: Drinking water..."
                    disabled={formActionIsDelete}
                />

                {formActionIsDelete && (
                    <Form.AlertMessage>
                        Do you want to <strong>PERMANENTLY DELETE</strong> this
                        task?
                    </Form.AlertMessage>
                )}

                <FormButtons
                    currentSubmitButtonProps={currentSubmitButton}
                    handlerActionButton={handlerActionButton}
                />
            </Form.Root>
        </Form.Container>
    );
}

type TitlesProps = {
    formTitle: string;
    taskColumnTitle: string | undefined;
};

function Titles({ taskColumnTitle, formTitle }: TitlesProps) {
    return (
        <div className="flex flex-col">
            <Form.Title title={formTitle} className="mb-5" />
            <Form.SubTitle
                title={taskColumnTitle || ""}
                className="mb-10 self-center"
            />
        </div>
    );
}

type FormButtonsProps = {
    handlerActionButton: () => void;
    currentSubmitButtonProps: {
        label: string;
        icon: JSX.Element;
        bgColor: string;
    };
};

function FormButtons({
    handlerActionButton,
    currentSubmitButtonProps,
}: FormButtonsProps) {
    return (
        <div className="flex justify-between mt-5">
            <Form.ActionButton label="Cancel" onClick={handlerActionButton} />
            <Form.SubmitButton
                className={currentSubmitButtonProps.bgColor}
                label={currentSubmitButtonProps.label}
                icon={currentSubmitButtonProps.icon}
            />
        </div>
    );
}
