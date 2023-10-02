import { Dispatch, SetStateAction, useEffect, useState } from "react";

type useLocalStorageReturnType<T> = [
    T | null,
    Dispatch<SetStateAction<T | null>>,
    boolean
];

export default function useLocalStorage<T>(
    key: string,
    initialValue: T
): useLocalStorageReturnType<T> {
    const [item, setItem] = useState<T | null>(initialValue);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        function getLocalStorageItem() {
            try {
                const item = localStorage.getItem(key);

                if (!item) {
                    setItem(null);
                    setLoading(false);
                    return;
                }

                setLoading(false);

                setItem(JSON.parse(item));
            } catch (e) {
                console.error(e);
            }
        }

        getLocalStorageItem();
    }, [key]);

    useEffect(() => {
        function setLocalStorageItem() {
            try {
                localStorage.setItem(key, JSON.stringify(item));
            } catch (e) {
                console.error(e);
            }
        }

        setLocalStorageItem();
    }, [item, key]);

    return [item, setItem, loading];
}
