const BASE_URL =
  typeof process !== 'undefined' && process.env.NODE_ENV === 'test'
    ? 'http://localhost/api'
    : '/api';
const TIMEOUT_MS = 10000;

interface RequestOptions extends RequestInit {
  timeout?: number;
}

function withTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Request timed out')), timeout);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// --- Interceptor Types and Registration ---
type RequestInterceptor = (input: RequestInfo, init: RequestInit) => Promise<[RequestInfo, RequestInit]> | [RequestInfo, RequestInit];
type ResponseInterceptor = (response: Response) => Promise<Response> | Response;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export function addRequestInterceptor(interceptor: RequestInterceptor) {
  requestInterceptors.push(interceptor);
}

export function addResponseInterceptor(interceptor: ResponseInterceptor) {
  responseInterceptors.push(interceptor);
}

async function applyRequestInterceptors(input: RequestInfo, init: RequestInit): Promise<[RequestInfo, RequestInit]> {
  let req: [RequestInfo, RequestInit] = [input, init];
  for (const interceptor of requestInterceptors) {
    req = await interceptor(req[0], req[1]);
  }
  return req;
}

async function applyResponseInterceptors(response: Response): Promise<Response> {
  let res = response;
  for (const interceptor of responseInterceptors) {
    res = await interceptor(res);
  }
  return res;
}

/**
 * Custom error types for API utility
 */
export class ApiError extends Error {
  constructor(message: string, public status?: number, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Exponential backoff retry helper
 */
async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delay = 300, factor = 2): Promise<T> {
  let attempt = 0;
  let lastError: any;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === retries - 1) break;
      await new Promise((res) => setTimeout(res, delay * Math.pow(factor, attempt)));
      attempt++;
    }
  }
  throw lastError;
}

/**
 * GET request with retry and improved error handling
 */
export async function apiGet<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  return retryWithBackoff(async () => {
    let url: RequestInfo = `${BASE_URL}${endpoint}`;
    let init: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };
    [url, init] = await applyRequestInterceptors(url, init);
    const timeout = options.timeout ?? TIMEOUT_MS;
    let response: Response;
    try {
      response = await withTimeout(fetch(url, init), timeout);
    } catch (err: any) {
      if (err.message === 'Request timed out') throw new TimeoutError(err.message);
      throw new NetworkError(err.message);
    }
    const interceptedResponse = await applyResponseInterceptors(response);
    if (!interceptedResponse.ok) {
      let errorData;
      try { errorData = await interceptedResponse.json(); } catch {}
      throw new ApiError(`API error: ${interceptedResponse.status}`, interceptedResponse.status, errorData);
    }
    // Handle 204 No Content gracefully
    if (interceptedResponse.status === 204) return undefined as T;
    return interceptedResponse.json();
  });
}

/**
 * POST request with retry and improved error handling
 */
export async function apiPost<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
  return retryWithBackoff(async () => {
    let url: RequestInfo = `${BASE_URL}${endpoint}`;
    let init: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };
    [url, init] = await applyRequestInterceptors(url, init);
    const timeout = options.timeout ?? TIMEOUT_MS;
    let response: Response;
    try {
      response = await withTimeout(fetch(url, init), timeout);
    } catch (err: any) {
      if (err.message === 'Request timed out') throw new TimeoutError(err.message);
      throw new NetworkError(err.message);
    }
    const interceptedResponse = await applyResponseInterceptors(response);
    if (!interceptedResponse.ok) {
      let errorData;
      try { errorData = await interceptedResponse.json(); } catch {}
      throw new ApiError(`API error: ${interceptedResponse.status}`, interceptedResponse.status, errorData);
    }
    // Handle 204 No Content gracefully
    if (interceptedResponse.status === 204) return undefined as T;
    return interceptedResponse.json();
  });
} 