import { atomWithStorage } from "jotai/utils";

const darkModeAtom = atomWithStorage<boolean>("darkMode", true);

export { darkModeAtom };
