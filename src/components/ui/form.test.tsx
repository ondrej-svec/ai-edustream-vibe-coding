import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './form';
import { Input } from './input';

describe('FormField', () => {
  it('renders label and shows error on submit if required', async () => {
    const Wrapper = () => {
      const methods = useForm({ defaultValues: { name: '' } });
      return (
        <Form {...methods}>
          <FormField
            name="name"
            control={methods.control}
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
    expect(screen.getByText('Name')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
  });
}); 