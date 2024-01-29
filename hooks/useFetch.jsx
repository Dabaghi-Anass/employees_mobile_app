import axios from 'axios';
import { useEffect, useState } from 'react';
export function useFetch(endpoint, options = null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
    useEffect(() => {
        handleFetch();
    }, [endpoint]);
    return {data, error, isLoading};
}