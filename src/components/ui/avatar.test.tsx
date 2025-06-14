import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

// Mock Radix AvatarPrimitive.Image to always render a real <img> for test reliability
vi.mock('@radix-ui/react-avatar', async () => {
  const actual = await vi.importActual<any>('@radix-ui/react-avatar');
  return {
    ...actual,
    Image: React.forwardRef<HTMLImageElement, any>((props, ref) => <img ref={ref} {...props} />),
  };
});

describe('Avatar', () => {
  it('renders the Avatar root', () => {
    const { container } = render(<Avatar data-testid="avatar-root" />);
    expect(container.querySelector('[data-testid="avatar-root"]')).toBeInTheDocument();
  });

  it('renders AvatarImage inside Avatar', () => {
    render(
      <Avatar>
        <AvatarImage src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAp6Q2VwAAAAASUVORK5CYII=" alt="avatar" data-testid="avatar-image" />
      </Avatar>
    );
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
  });

  it('renders AvatarFallback when image fails to load', () => {
    render(
      <Avatar>
        <AvatarImage src="broken.png" alt="broken" data-testid="avatar-image" />
        <AvatarFallback data-testid="avatar-fallback">AB</AvatarFallback>
      </Avatar>
    );
    // Simulate image error
    const img = screen.getByTestId('avatar-image');
    img.dispatchEvent(new Event('error'));
    expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('applies custom className to Avatar', () => {
    const { container } = render(<Avatar className="custom-class" data-testid="avatar-root" />);
    expect(container.querySelector('[data-testid="avatar-root"]')).toHaveClass('custom-class');
  });

  it('applies custom className to AvatarImage', () => {
    render(
      <Avatar>
        <AvatarImage src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAp6Q2VwAAAAASUVORK5CYII=" alt="avatar" className="custom-img" data-testid="avatar-image" />
      </Avatar>
    );
    expect(screen.getByTestId('avatar-image')).toHaveClass('custom-img');
  });

  it('applies custom className to AvatarFallback', () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fallback" data-testid="avatar-fallback">AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId('avatar-fallback')).toHaveClass('custom-fallback');
  });
}); 