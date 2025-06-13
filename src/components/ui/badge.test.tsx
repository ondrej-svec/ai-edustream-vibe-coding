import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders a badge with children', () => {
    const { getByText } = render(<Badge>Label</Badge>);
    expect(getByText('Label')).toBeInTheDocument();
  });

  it('applies the default variant styles', () => {
    const { getByText } = render(<Badge>Default</Badge>);
    expect(getByText('Default')).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('applies the secondary variant styles', () => {
    const { getByText } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(getByText('Secondary')).toHaveClass('bg-secondary', 'text-secondary-foreground');
  });

  it('applies the destructive variant styles', () => {
    const { getByText } = render(<Badge variant="destructive">Destructive</Badge>);
    expect(getByText('Destructive')).toHaveClass('bg-destructive', 'text-destructive-foreground');
  });

  it('applies the outline variant styles', () => {
    const { getByText } = render(<Badge variant="outline">Outline</Badge>);
    expect(getByText('Outline')).toHaveClass('text-foreground');
  });

  it('applies custom className if provided', () => {
    const { getByText } = render(<Badge className="custom-class">Custom</Badge>);
    expect(getByText('Custom')).toHaveClass('custom-class');
  });
}); 