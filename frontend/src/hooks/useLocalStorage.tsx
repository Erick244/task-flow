import { useEffect, useState } from "react";

type useLocalStorageReturnType<T> = [T | null, (item: T) => void, boolean];

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

    function updateItem(item: T) {
        try {
            setItem(item);
            localStorage.setItem(key, JSON.stringify(item));
        } catch (e) {
            console.error(e);
        }
    }

    return [item, updateItem, loading];
}
