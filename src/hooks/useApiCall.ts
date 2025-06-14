import React, { useState, useCallback } from 'react';
import { logError } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export interface ApiCallState<T, Args extends unknown[]> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  call: (...args: Args) => Promise<T | void>;
  retry: () => void;
}

/**
 * Custom React hook for making API calls with loading, error, and retry state management.
 * @param apiFn - The API function to call.
 * @param args - Arguments to pass to the API function.
 * @returns An object containing data, loading, error, and a retry function.
 */
export function useApiCall<T, Args extends unknown[]>(
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
      logError(err);
      toast({ title: "API Error", description: err instanceof Error ? err.message : String(err), variant: "destructive" });
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
  React.useEffect(() => {
    if (immediate && initialArgs) {
      call(...initialArgs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, call, retry };
} 