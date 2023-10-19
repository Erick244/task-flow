import { ToastOptions, TypeOptions, toast } from "react-toastify";

const DEFAULT_TOAST_OPTIONS: ToastOptions = {
    theme: "dark",
    position: "bottom-center",
};

export function defaultToast(
    msg: string,
    type: TypeOptions,
    options?: ToastOptions
) {
    const config = {
        type,
        ...DEFAULT_TOAST_OPTIONS,
        ...options,
    };

    return toast(msg, config);
}
