import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { RadioGroup, RadioGroupItem } from './radio-group';

describe('RadioGroup', () => {
  it('renders radio group with items', () => {
    const { getByRole, getAllByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    expect(getByRole('radiogroup')).toBeInTheDocument();
    expect(getAllByRole('radio').length).toBe(2);
  });

  it('selects a radio item on click', () => {
    const { getAllByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    const radios = getAllByRole('radio');
    fireEvent.click(radios[1]);
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('applies custom className to RadioGroupItem', () => {
    const { getAllByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="a" className="custom-class" />
      </RadioGroup>
    );
    expect(getAllByRole('radio')[0]).toHaveClass('custom-class');
  });

  it('forwards ref to the radio item', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <RadioGroup>
        <RadioGroupItem value="a" ref={ref} />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
}); 