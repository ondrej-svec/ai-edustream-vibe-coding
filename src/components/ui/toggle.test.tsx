import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Toggle } from './toggle';

describe('Toggle', () => {
  it('renders a toggle button', () => {
    const { getByRole } = render(<Toggle aria-label="Toggle" />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('toggles state on click', () => {
    const { getByRole } = render(<Toggle aria-label="Toggle" />);
    const button = getByRole('button');
    expect(button).toHaveAttribute('data-state', 'off');
    fireEvent.click(button);
    expect(button).toHaveAttribute('data-state', 'on');
    fireEvent.click(button);
    expect(button).toHaveAttribute('data-state', 'off');
  });

  it('applies the outline variant styles', () => {
    const { getByRole } = render(<Toggle variant="outline" aria-label="Toggle" />);
    expect(getByRole('button')).toHaveClass('border', 'border-input');
  });

  it('applies the small size styles', () => {
    const { getByRole } = render(<Toggle size="sm" aria-label="Toggle" />);
    expect(getByRole('button')).toHaveClass('h-9', 'px-2.5');
  });

  it('applies the large size styles', () => {
    const { getByRole } = render(<Toggle size="lg" aria-label="Toggle" />);
    expect(getByRole('button')).toHaveClass('h-11', 'px-5');
  });

  it('applies custom className if provided', () => {
    const { getByRole } = render(<Toggle className="custom-class" aria-label="Toggle" />);
    expect(getByRole('button')).toHaveClass('custom-class');
  });
}); 