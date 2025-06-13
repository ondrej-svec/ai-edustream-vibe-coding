import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders a button element by default', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Button className="custom-class">Test</Button>);
    expect(getByRole('button')).toHaveClass('custom-class');
  });

  it('renders as a child element when asChild is true', () => {
    const { getByText } = render(
      <Button asChild>
        <a href="#">Link</a>
      </Button>
    );
    const link = getByText('Link');
    expect(link.tagName).toBe('A');
  });

  it('forwards ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
}); 