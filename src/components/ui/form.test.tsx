import '@testing-library/jest-dom/matchers';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './form';
import { Input } from './input';

describe('FormField', () => {
  it('renders label and shows error on submit if required', async () => {
    const Wrapper = () => {
      const methods = useForm({ defaultValues: { name: '' } });
      const { control, register, unregister, handleSubmit, watch, setValue, getValues, reset, resetField, setError, clearErrors, setFocus, getFieldState, formState } = methods;
      return (
        <Form form={methods}>
          <FormField
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      );
    };
    render(<Wrapper />);
    expect(screen.queryByText('Name')).not.toBeNull();
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeNull();
    });
  });
}); 