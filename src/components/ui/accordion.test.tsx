import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';

describe('Accordion', () => {
  it('renders an accordion with items', () => {
    const { getByText } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(getByText('Section 1')).toBeInTheDocument();
  });

  it('expands and collapses content on trigger click', () => {
    const { getByText, queryByText } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const trigger = getByText('Section 1');
    expect(queryByText('Content 1')).toBeNull();
    fireEvent.click(trigger);
    expect(getByText('Content 1')).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(queryByText('Content 1')).toBeNull();
  });

  it('applies custom className to AccordionItem', () => {
    const { getByText } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="custom-class">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(getByText('Section 1').closest('.custom-class')).toBeTruthy();
  });
}); 