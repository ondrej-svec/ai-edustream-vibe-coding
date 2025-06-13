import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  it('renders an input element', () => {
    const { getByRole } = render(<Input />);
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Input className="custom-class" />);
    expect(getByRole('textbox')).toHaveClass('custom-class');
  });

  it('renders with the specified type', () => {
    const { getByPlaceholderText } = render(<Input type="password" placeholder="pw" />);
    const input = getByPlaceholderText('pw');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
}); 