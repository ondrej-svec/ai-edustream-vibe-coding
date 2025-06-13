import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Loader } from './loader';

describe('Loader', () => {
  it('renders the loader with default label', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with a custom label', () => {
    render(<Loader label="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('renders with a custom size', () => {
    render(<Loader size={48} />);
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  it('applies custom className if provided', () => {
    render(<Loader className="custom-class" />);
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });
}); 