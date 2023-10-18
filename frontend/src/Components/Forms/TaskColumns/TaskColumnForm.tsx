"use client";
import { Form } from "@/Components/Templates/Form";
import { PlusIcon, TrashIcon } from "@/Components/Utils/Icons";
import { taskColumnFormStateAtom } from "@/atomns/StateAtoms";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { FormActions } from "@/models/enums/FormActions.enum";
import { useAtom } from "jotai";

export default function TaskColumnForm() {
    const [taskColumnFormState, setTaskColumnFormState] = useAtom(
        taskColumnFormStateAtom
    );

    const { taskColumn } = taskColumnFormState;

    function handlerActionButton() {
        setTaskColumnFormState((taskColumnFormState) => {
            return {
                ...taskColumnFormState,
                visibility: false,
            };
        });
    }

    const formActionIsDelete =
        taskColumnFormState.formAction === FormActions.DELETE;

    const disableLabelAnimation = !!taskColumn?.title;

    const currentFormTitle = formActionIsDelete
        ? "Delete Task Column"
        : "Save Task Column";

    const currentSubmitButton = {
        label: formActionIsDelete ? "Delete" : "Save",
        icon: formActionIsDelete ? TrashIcon : PlusIcon,
        bgColor: formActionIsDelete
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600",
    };

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <Form.Title title={currentFormTitle} className="mb-10" />
            <Form.Root>
                <Form.Input
                    label="Title"
                    value={taskColumn?.title || ""}
                    disabled={formActionIsDelete}
                    disableLabelAnimation={disableLabelAnimation}
                />

                {formActionIsDelete && (
                    <Form.AlertMessage>
                        Do you want to <strong>PERMANENTLY DELETE</strong> this
                        task column?
                    </Form.AlertMessage>
                )}

                <div className="flex justify-between mt-5">
                    <Form.ActionButton
                        label="Cancel"
                        onClick={handlerActionButton}
                    />
                    <Form.SubmitButton
                        className={currentSubmitButton.bgColor}
                        label={currentSubmitButton.label}
                        icon={currentSubmitButton.icon}
                    />
                </div>
            </Form.Root>
        </Form.Container>
    );
}
