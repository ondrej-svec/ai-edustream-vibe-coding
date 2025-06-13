import React, { useState, useCallback } from 'react';

export interface ApiCallState<T, Args extends any[]> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  call: (...args: Args) => Promise<T | void>;
  retry: () => void;
}

/**
 * useApiCall - React hook for managing API calls with loading, error, and retry state.
 * @param apiFn - The async API function to call
 * @param immediate - If true, call immediately on mount (default: false)
 */
export function useApiCall<T, Args extends any[]>(
  apiFn: (...args: Args) => Promise<T>,
  immediate: boolean = false,
  initialArgs?: Args
): ApiCallState<T, Args> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastArgs, setLastArgs] = useState<Args | undefined>(initialArgs);
  const [retryCount, setRetryCount] = useState(0);

  const call = useCallback(async (...args: Args) => {
    setLoading(true);
    setError(null);
    setLastArgs(args);
    try {
      const result = await apiFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [apiFn]);

  const retry = useCallback(() => {
    if (lastArgs) {
      setRetryCount((c) => c + 1);
      call(...lastArgs);
    }
  }, [call, lastArgs]);

  // Optionally call immediately on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (immediate && initialArgs) {
      call(...initialArgs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, call, retry };
} 