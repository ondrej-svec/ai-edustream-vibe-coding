import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    const { getByRole } = render(<Checkbox />);
    expect(getByRole('checkbox')).toBeInTheDocument();
  });

  it('can be checked and unchecked', () => {
    const { getByRole } = render(<Checkbox />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    // Radix Checkbox does not update checked state automatically in test, so we check for aria-checked
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Checkbox className="custom-class" />);
    expect(getByRole('checkbox')).toHaveClass('custom-class');
  });

  it('forwards ref to the checkbox element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
}); 