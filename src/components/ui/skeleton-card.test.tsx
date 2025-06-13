import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { SkeletonCard } from './skeleton-card';

describe('SkeletonCard', () => {
  it('renders a single skeleton card by default', () => {
    render(<SkeletonCard />);
    const wrapper = screen.getByTestId('skeleton-card-wrapper');
    const skeletons = wrapper.querySelectorAll('div.w-64');
    expect(skeletons.length).toBe(1);
  });

  it('renders the specified number of skeleton cards', () => {
    render(<SkeletonCard count={3} />);
    const wrapper = screen.getByTestId('skeleton-card-wrapper');
    const skeletons = wrapper.querySelectorAll('div.w-64');
    expect(skeletons.length).toBe(3);
  });

  it('applies custom className if provided', () => {
    render(<SkeletonCard className="custom-class" />);
    const wrapper = screen.getByTestId('skeleton-card-wrapper');
    expect(wrapper).toHaveClass('custom-class');
  });
}); 