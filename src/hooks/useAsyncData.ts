import { useState, useEffect, useCallback } from 'react';

export interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retry: () => void;
}

/**
 * useAsyncData - React hook for managing async data fetching with loading, error, and retry state.
 * @param asyncFn - The async function to execute (should return a Promise)
 * @param deps - Dependency array for re-running the async function
 */
export function useAsyncData<T>(asyncFn: () => Promise<T>, deps: any[] = []): AsyncDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => setRetryCount((c) => c + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    asyncFn()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, retryCount]);

  return { data, loading, error, retry };
} 