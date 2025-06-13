import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { ValidationSummary } from './validation-summary';

describe('ValidationSummary', () => {
  it('renders a list of error messages', () => {
    const errors = { name: 'Name is required', email: 'Email is invalid' };
    render(<ValidationSummary errors={errors} />);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders nothing if there are no errors', () => {
    const { container } = render(<ValidationSummary errors={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('applies custom className if provided', () => {
    const errors = { name: 'Name is required' };
    render(<ValidationSummary errors={errors} className="custom-class" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });
}); 