import { TaskModel } from "@/models/entities/Task.model";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import { FormActions } from "@/models/enums/FormActions.enum";
import { atom } from "jotai";

interface SaveTaskComlumFormAtomType {
    taskColumn: TaskColumnModel | null;
    visibility: boolean;
    formAction: FormActions;
}

const taskColumnFormStateAtom = atom<SaveTaskComlumFormAtomType>({
    taskColumn: null,
    visibility: false,
    formAction: FormActions.CREATE,
});

interface taskFormStateAtomType {
    task: TaskModel | null;
    taskColumn: TaskColumnModel | null;
    visibility: boolean;
    formAction: FormActions;
}

const taskFormStateAtom = atom<taskFormStateAtomType>({
    task: null,
    taskColumn: null,
    visibility: false,
    formAction: FormActions.CREATE,
});

export { taskColumnFormStateAtom, taskFormStateAtom };
