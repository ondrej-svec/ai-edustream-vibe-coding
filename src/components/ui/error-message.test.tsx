import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { ErrorMessage } from './error-message';

describe('ErrorMessage', () => {
  it('renders the message and default severity', () => {
    render(<ErrorMessage message="Error occurred" />);
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50', 'text-red-700');
  });

  it('renders details if provided', () => {
    render(<ErrorMessage message="Error" details="More info" />);
    expect(screen.getByText('More info')).toBeInTheDocument();
  });

  it('applies info severity styles', () => {
    render(<ErrorMessage message="Info" severity="info" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50', 'text-blue-700');
  });

  it('applies warning severity styles', () => {
    render(<ErrorMessage message="Warning" severity="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50', 'text-yellow-800');
  });

  it('applies custom className if provided', () => {
    render(<ErrorMessage message="Custom" className="custom-class" />);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });
}); 