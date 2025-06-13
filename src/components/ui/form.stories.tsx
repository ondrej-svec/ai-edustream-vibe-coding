import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './form';
import { Input } from './input';

const meta: Meta = {
  title: 'UI/FormField',
  component: FormField,
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => {
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
      </Form>
    );
  },
}; 