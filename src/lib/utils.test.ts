import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cn, sanitizeHtml, logError } from './utils';

// Mock DOMPurify for sanitizeHtml tests
vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((dirty, opts) => `sanitized:${dirty}`)
  }
}));

// --- cn ---
describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
    expect(cn('foo', false && 'bar', undefined, 'baz')).toBe('foo baz'); // eslint-disable-line no-constant-binary-expression
    expect(cn('foo', 0, null, 'bar')).toBe('foo bar');
  });
});

// --- sanitizeHtml ---
describe('sanitizeHtml', () => {
  it('calls DOMPurify.sanitize and returns sanitized string', () => {
    const dirty = '<img src=x onerror=alert(1) />';
    expect(sanitizeHtml(dirty)).toBe('sanitized:<img src=x onerror=alert(1) />');
  });
});

// --- logError ---
describe('logError', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    errorSpy.mockRestore();
  });
  it('logs error and info to console', () => {
    logError('fail', { foo: 1 });
    expect(errorSpy).toHaveBeenCalledWith('[Error]', 'fail', { foo: 1 });
  });
  it('logs error with no info', () => {
    logError('fail');
    expect(errorSpy).toHaveBeenCalledWith('[Error]', 'fail', undefined);
  });
}); 