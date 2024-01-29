import { useEffect, useState } from 'react';
import dataFromServer from "../api/data.json";
const dataFiltred = dataFromServer;
export function useFetch(endpoint, options = null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFetch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(endpoint, options);
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handleFetch();
    }, []);
    return {data : dataFiltred, error, isLoading};
}