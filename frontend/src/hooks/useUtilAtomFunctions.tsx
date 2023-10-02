"use client";
import {
    taskColumnFormStateAtom,
    taskFormStateAtom,
} from "@/atomns/FormsAtoms";
import { menuDropDownVisibilityAtom } from "@/atomns/VisibilityAtoms";
import { useSetAtom } from "jotai";

export default function useUtilAtomFunctions() {
    const setMenuVisibility = useSetAtom(menuDropDownVisibilityAtom);
    const setTaskColumnFormVisibility = useSetAtom(taskColumnFormStateAtom);
    const setSaveTaskFormVisibility = useSetAtom(taskFormStateAtom);

    function closeAllVisibilityAtoms() {
        setMenuVisibility(false);

        setTaskColumnFormVisibility((taskColumnFormState) => {
            return {
                ...taskColumnFormState,
                visibility: false,
            };
        });

        setSaveTaskFormVisibility((taskFormState) => {
            return {
                ...taskFormState,
                visibility: false,
            };
        });
    }

    return {
        closeAllVisibilityAtoms,
    };
}
