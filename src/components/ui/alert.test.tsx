import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from './alert';

describe('Alert', () => {
  it('renders an alert with title and description', () => {
    const { getByRole, getByText } = render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert description goes here.</AlertDescription>
      </Alert>
    );
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByText('Alert Title')).toBeInTheDocument();
    expect(getByText('Alert description goes here.')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Alert className="custom-class">Test</Alert>);
    expect(getByRole('alert')).toHaveClass('custom-class');
  });

  it('applies destructive variant styles', () => {
    const { getByRole } = render(<Alert variant="destructive">Destructive</Alert>);
    expect(getByRole('alert').className).toMatch(/destructive/);
  });
}); 