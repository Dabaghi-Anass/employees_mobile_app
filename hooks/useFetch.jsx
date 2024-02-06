import axios from 'axios';
import { useEffect, useState } from 'react';
export function useFetch(endpoint, options = null,interupt = false) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    if(interupt) return {data, error,refetchData : () => {}, isLoading};
    const handleFetch = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.request(endpoint, options);
            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    function refetchData() {
        handleFetch();
    }
    useEffect(() => {
        handleFetch();
    }, [endpoint]);
    return {data, error,refetchData, isLoading};
}