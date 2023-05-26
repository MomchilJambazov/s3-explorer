import { useState, useEffect } from 'react';

interface UseApiCallState<T> {
    data: T | null;
    isLoading: boolean;
    hasError: boolean;
}

const useApiCall = <T,>(apiCall: () => Promise<T>, pollingInterval?: number): UseApiCallState<T> => {
    const [state, setState] = useState<UseApiCallState<T>>({
        data: null,
        isLoading: true,
        hasError: false
    });
    const [shouldPoll, setShouldPoll] = useState(true);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const fetchData = async () => {
            if (!shouldPoll) {
                return;
            }
            try {
                const response = await apiCall();
                setState({ data: response, isLoading: false, hasError: false });
            } catch {
                setState({ data: null, isLoading: false, hasError: true });
            }
        };

        fetchData();

        if (pollingInterval) {
            intervalId = setInterval(fetchData, pollingInterval);
        }

        return () => {
            setShouldPoll(false);
            if (pollingInterval) {
                clearInterval(intervalId);
            }
        };
    }, [apiCall, pollingInterval, shouldPoll]);

    return state;
};

export default useApiCall;