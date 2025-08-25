import { useState } from "react";

interface UseFetchResult<T, Args extends any[]> {
    data: T | undefined;
    loading: boolean | null;
    error: unknown;
    fn: (...args: Args) => Promise<void>;
}

type FetchCallback<T, Args extends any[]> = (...args: Args) => Promise<T>;

const useFetch = <T, Args extends any[] = any[]>(cb: FetchCallback<T, Args>): UseFetchResult<T, Args> => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<unknown>(null);

    const fn = async (...args: Args) => {
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn };
};

export default useFetch;