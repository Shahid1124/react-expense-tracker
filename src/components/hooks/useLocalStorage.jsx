import { useState, useEffect } from "react";

 const useLocalStorage = (key, initialValue) => {
    const [storageData, setStorageData] = useState(() => {
        const savedData = localStorage.getItem(key);

        return savedData ? JSON.parse(savedData) : initialValue
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storageData));
    }, [key, storageData])

    return [storageData, setStorageData]
 }

 export default useLocalStorage;