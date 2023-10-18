"use client";
import {
    taskColumnFormStateAtom,
    taskFormStateAtom,
} from "@/atomns/StateAtoms";
import {
    menuDropDownVisibilityAtom,
    updateUserFormVisibilityAtom,
} from "@/atomns/VisibilityAtoms";
import { useSetAtom } from "jotai";

export default function useUtilAtomFunctions() {
    const setMenuVisibility = useSetAtom(menuDropDownVisibilityAtom);
    const setTaskColumnFormVisibility = useSetAtom(taskColumnFormStateAtom);
    const setSaveTaskFormVisibility = useSetAtom(taskFormStateAtom);
    const setUpdateUserFormVisibility = useSetAtom(
        updateUserFormVisibilityAtom
    );

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

        setUpdateUserFormVisibility(false);
    }

    return {
        closeAllVisibilityAtoms,
    };
}
