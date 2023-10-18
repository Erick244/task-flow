import { atom } from "jotai";

const menuDropDownVisibilityAtom = atom<boolean>(false);

interface FloatMenuvisibilityProps {
    visibility: boolean;
    position: {
        x: number;
        y: number;
    };
}

const floatMenuvisibilityAtom = atom<FloatMenuvisibilityProps>(
    {} as FloatMenuvisibilityProps
);

const updateUserFormVisibilityAtom = atom<boolean>(false);

export {
    floatMenuvisibilityAtom,
    menuDropDownVisibilityAtom,
    updateUserFormVisibilityAtom,
};
