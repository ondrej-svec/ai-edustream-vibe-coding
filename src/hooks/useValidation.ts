import { useState, useCallback } from 'react';
import { ZodSchema, ZodError, ZodTypeAny } from 'zod';

export type ValidationErrors<T> = Record<string, string | undefined>;

export function useValidation<T extends Record<string, unknown>>(
  schema: ZodSchema<T> | ZodTypeAny,
  initialValues: T
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  // Validate the entire form
  const validate = useCallback(
    (vals: T = values): boolean => {
      try {
        schema.parse(vals);
        setErrors({});
        return true;
      } catch (err) {
        if (err instanceof ZodError) {
          const fieldErrors: ValidationErrors<T> = {};
          err.errors.forEach((e) => {
            const field = e.path[0] as keyof T;
            if (typeof field === 'string' && !fieldErrors[field]) {
              fieldErrors[field] = e.message;
            }
          });
          setErrors(fieldErrors);
        }
        return false;
      }
    },
    [schema, values]
  );

  // Validate a single field
  const validateField = useCallback(
    (field: keyof T, value: unknown): string | undefined => {
      try {
        // Validate by merging the field value into the current values
        schema.parse({ ...values, [field]: value });
        setErrors((prev) => ({ ...(prev as unknown) as ValidationErrors<T>, [field]: undefined }));
        return undefined;
      } catch (err) {
        if (err instanceof ZodError) {
          // Find the error for this field
          const fieldError = err.errors.find((e) => e.path[0] === field);
          const message = fieldError?.message;
          setErrors((prev) => ({ ...(prev as unknown) as ValidationErrors<T>, [field]: message }));
          return message;
        }
        return undefined;
      }
    },
    [schema, values]
  );

  // Handle field change
  const handleChange = useCallback(
    (field: keyof T, value: unknown) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, value);
    },
    [validateField]
  );

  // Handle form submit
  const handleSubmit = (onValid: (vals: T) => void, onInvalid?: (errs: ValidationErrors<T>) => void) =>
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const isValid = validate();
      if (isValid) {
        onValid(values);
      } else if (onInvalid) {
        onInvalid(errors);
      }
    };

  /**
   * Map server-side validation errors to local errors state.
   * Accepts an object where keys are field names and values are error messages.
   * Example: { email: 'Email already exists', password: 'Too weak' }
   */
  const setServerErrors = useCallback((serverErrors: Record<string, string | undefined>) => {
    setErrors((prev) => ({ ...prev, ...serverErrors }));
  }, []);

  return {
    values,
    setValues,
    errors,
    touched,
    setTouched,
    validate,
    validateField,
    handleChange,
    handleSubmit,
    setErrors,
    setServerErrors,
  };
} 