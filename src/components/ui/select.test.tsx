import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup
} from './select';

describe('Select', () => {
  it('renders a select trigger', () => {
    const { getByRole } = render(
      <Select>
        <SelectTrigger>Open</SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(getByRole('combobox')).toBeInTheDocument();
  });

  // Note: Radix Select is portal-based and requires more advanced testing for open/close and selection.
  // Here we check for static rendering and className.

  it('applies custom className to SelectTrigger', () => {
    const { getByRole } = render(
      <Select>
        <SelectTrigger className="custom-class">Open</SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(getByRole('combobox')).toHaveClass('custom-class');
  });

  it('renders SelectLabel inside SelectGroup when open', () => {
    const { getByRole, getByText } = render(
      <Select>
        <SelectTrigger>Open</SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Label</SelectLabel>
            <SelectItem value="a">A</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    fireEvent.click(getByRole('combobox'));
    expect(getByText('Label')).toBeInTheDocument();
  });
}); 