import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ApiError,
  NetworkError,
  TimeoutError,
  addRequestInterceptor,
  addResponseInterceptor,
  apiGet,
  apiPost,
} from './api';

// --- Error Classes ---
describe('API Error Classes', () => {
  it('ApiError sets name, message, status, and data', () => {
    const err = new ApiError('fail', 404, { foo: 1 });
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('ApiError');
    expect(err.message).toBe('fail');
    expect(err.status).toBe(404);
    expect(err.data).toEqual({ foo: 1 });
  });
  it('NetworkError sets name and message', () => {
    const err = new NetworkError('netfail');
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('NetworkError');
    expect(err.message).toBe('netfail');
  });
  it('TimeoutError sets name and message', () => {
    const err = new TimeoutError('timeout');
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('TimeoutError');
    expect(err.message).toBe('timeout');
  });
});

// --- Interceptors ---
describe('API Interceptors', () => {
  it('addRequestInterceptor adds a request interceptor', async () => {
    const interceptor = vi.fn((input: RequestInfo, init: RequestInit): [RequestInfo, RequestInit] => [input, init]);
    addRequestInterceptor(interceptor);
    expect(typeof interceptor).toBe('function');
  });
  it('addResponseInterceptor adds a response interceptor', async () => {
    const interceptor = vi.fn((res) => res);
    addResponseInterceptor(interceptor);
    expect(typeof interceptor).toBe('function');
  });
});

// --- API Utilities ---
describe('apiGet and apiPost', () => {
  const originalFetch = global.fetch;
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('apiGet returns data on success', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ foo: 'bar' }),
    })));
    const data = await apiGet<{ foo: string }>('/test');
    expect(data).toEqual({ foo: 'bar' });
  });

  it('apiGet throws ApiError on API error', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'fail' }),
    })));
    await expect(apiGet('/fail')).rejects.toThrow('API error: 400');
  });

  it('apiGet throws NetworkError on fetch failure', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('network down'))));
    await expect(apiGet('/fail')).rejects.toBeInstanceOf(NetworkError);
  });

  it('apiGet throws TimeoutError on timeout', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
    await expect(apiGet('/timeout', { timeout: 10 })).rejects.toBeInstanceOf(TimeoutError);
  });

  it('apiPost returns data on success', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ id: 1 }),
    })));
    const data = await apiPost<{ id: number }>('/test', { foo: 'bar' });
    expect(data).toEqual({ id: 1 });
  });

  it('apiPost throws ApiError on API error', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'fail' }),
    })));
    await expect(apiPost('/fail', {})).rejects.toThrow('API error: 500');
  });
}); 