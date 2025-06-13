import { describe, it, expect } from 'vitest';
import {
  registrationSchema,
  registrationSchemaWithConfirm,
  loginSchema,
  profileUpdateSchema,
  dataEntrySchema,
} from './schemas';

describe('registrationSchema', () => {
  it('validates correct data', () => {
    expect(() => registrationSchema.parse({
      email: 'a@b.com',
      password: 'password123',
      confirmPassword: 'password123',
      name: 'John',
    })).not.toThrow();
  });
  it('fails on invalid email', () => {
    expect(() => registrationSchema.parse({
      email: 'bad', password: 'password123', confirmPassword: 'password123', name: 'John',
    })).toThrow(/Invalid email address/);
  });
  it('fails on short password', () => {
    expect(() => registrationSchema.parse({
      email: 'a@b.com', password: 'short', confirmPassword: 'short', name: 'John',
    })).toThrow(/at least 8 characters/);
  });
  it('fails on short name', () => {
    expect(() => registrationSchema.parse({
      email: 'a@b.com', password: 'password123', confirmPassword: 'password123', name: 'J',
    })).toThrow(/Name is required/);
  });
});

describe('registrationSchemaWithConfirm', () => {
  it('validates matching passwords', () => {
    expect(() => registrationSchemaWithConfirm.parse({
      email: 'a@b.com', password: 'password123', confirmPassword: 'password123', name: 'John',
    })).not.toThrow();
  });
  it('fails on mismatched passwords', () => {
    expect(() => registrationSchemaWithConfirm.parse({
      email: 'a@b.com', password: 'password123', confirmPassword: 'notmatch', name: 'John',
    })).toThrow(/Passwords do not match/);
  });
});

describe('loginSchema', () => {
  it('validates correct data', () => {
    expect(() => loginSchema.parse({ email: 'a@b.com', password: 'pw' })).not.toThrow();
  });
  it('fails on missing password', () => {
    expect(() => loginSchema.parse({ email: 'a@b.com', password: '' })).toThrow(/Password is required/);
  });
});

describe('profileUpdateSchema', () => {
  it('accepts partial data', () => {
    expect(() => profileUpdateSchema.parse({ name: 'Jane' })).not.toThrow();
    expect(() => profileUpdateSchema.parse({})).not.toThrow();
  });
  it('fails on invalid email', () => {
    expect(() => profileUpdateSchema.parse({ email: 'bad' })).toThrow();
  });
  it('fails on too long bio', () => {
    expect(() => profileUpdateSchema.parse({ bio: 'x'.repeat(501) })).toThrow();
  });
});

describe('dataEntrySchema', () => {
  it('validates correct data', () => {
    expect(() => dataEntrySchema.parse({ title: 'T', amount: 1 })).not.toThrow();
  });
  it('fails on missing title', () => {
    expect(() => dataEntrySchema.parse({ title: '', amount: 1 })).toThrow(/Title is required/);
  });
  it('fails on negative amount', () => {
    expect(() => dataEntrySchema.parse({ title: 'T', amount: -1 })).toThrow(/Amount must be positive/);
  });
}); 