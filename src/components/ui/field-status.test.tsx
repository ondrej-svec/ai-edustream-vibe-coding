import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { FieldStatus } from './field-status';

describe('FieldStatus', () => {
  it('renders valid status with green color', () => {
    const { container } = render(<FieldStatus status="valid" />);
    expect(container.firstChild).toHaveClass('text-green-600');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders invalid status with red color', () => {
    const { container } = render(<FieldStatus status="invalid" />);
    expect(container.firstChild).toHaveClass('text-red-600');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders untouched status with gray color', () => {
    const { container } = render(<FieldStatus status="untouched" />);
    expect(container.firstChild).toHaveClass('text-gray-400');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className if provided', () => {
    const { container } = render(<FieldStatus status="valid" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
}); 