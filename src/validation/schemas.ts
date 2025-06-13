import { z } from 'zod';

// User Registration Schema
export const registrationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
  name: z.string().min(2, { message: 'Name is required' }),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

// Add refinement for password confirmation
export const registrationSchemaWithConfirm = registrationSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

// Login Schema
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginData = z.infer<typeof loginSchema>;

// Profile Update Schema
export const profileUpdateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

// Generic Data Entry Schema (example)
export const dataEntrySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().max(1000).optional(),
  amount: z.number().min(0, { message: 'Amount must be positive' }),
});

export type DataEntry = z.infer<typeof dataEntrySchema>; 