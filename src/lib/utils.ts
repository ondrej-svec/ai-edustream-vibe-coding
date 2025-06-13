import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import DOMPurify from 'dompurify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sanitizes HTML input using DOMPurify to prevent XSS attacks.
 * @param dirty - The potentially unsafe HTML string.
 * @returns A sanitized HTML string safe for rendering.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
}

/**
 * Logs errors to the console and (optionally) to an external error reporting service.
 * @param error - The error object to log.
 * @param info - Optional additional info (e.g., React error info).
 */
export function logError(error: unknown, info?: unknown) {
  // Log to console
  console.error("[Error]", error, info);
  // TODO: Integrate with Sentry, Bugsnag, or another error reporting service here
}
