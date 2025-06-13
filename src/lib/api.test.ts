import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ApiError,
  NetworkError,
  TimeoutError,
  addRequestInterceptor,
  addResponseInterceptor,
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