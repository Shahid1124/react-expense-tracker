import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    const [storageData, setStorageData] = useState(() => {
        try {

            if (typeof window === 'undefined') {
                return initialValue;
            }
            const savedData = localStorage.getItem(key);

            return savedData ? JSON.parse(savedData) : initialValue
        } catch (error) {
            console.warn('Local storage is not available or access is denied:', error);
            return initialValue;
        }

    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storageData));
        } catch (error) {
            console.warn('Local storage is not available or access is denied:', error);
        }

    }, [key, storageData])

    return [storageData, setStorageData]
}

export default useLocalStorage;