import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { ValidationMessage } from './validation-message';


describe('ValidationMessage', () => {
  it('renders the message when provided', () => {
    render(<ValidationMessage message="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders nothing when no message is provided', () => {
    const { container } = render(<ValidationMessage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('applies custom className if provided', () => {
    render(<ValidationMessage message="Custom class" className="custom-class" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });
}); 