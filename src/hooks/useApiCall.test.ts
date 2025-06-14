import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useApiCall } from './useApiCall';

describe('useApiCall', () => {
  it('handles successful API call', async () => {
    const apiFn = vi.fn(async (x: number) => x * 2);
    const { result } = renderHook(() => useApiCall(apiFn));
    await act(async () => {
      const value = await result.current.call(3);
      expect(value).toBe(6);
    });
    expect(result.current.data).toBe(6);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('handles API error', async () => {
    const apiFn = vi.fn(async () => { throw new Error('fail'); });
    const { result } = renderHook(() => useApiCall(apiFn));
    await act(async () => {
      await result.current.call();
    });
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('fail');
    expect(result.current.loading).toBe(false);
  });

  it('supports retrying the last call', async () => {
    let count = 0;
    const apiFn = vi.fn(async () => {
      count++;
      if (count === 1) throw new Error('fail');
      return 42;
    });
    const { result } = renderHook(() => useApiCall(apiFn));
    await act(async () => {
      await result.current.call();
    });
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    await act(async () => {
      await result.current.retry();
    });
    expect(result.current.data).toBe(42);
    expect(result.current.error).toBeNull();
  });
}); 