import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter
} from './alert-dialog';

describe('AlertDialog', () => {
  it('renders and opens the dialog with title and description', () => {
    const { getByText, getByRole, queryByText } = render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Dialog Title</AlertDialogTitle>
          <AlertDialogDescription>Dialog description goes here.</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
    // Dialog content should not be in the DOM initially
    expect(queryByText('Dialog Title')).toBeNull();
    // Open the dialog
    fireEvent.click(getByText('Open Dialog'));
    expect(getByText('Dialog Title')).toBeInTheDocument();
    expect(getByText('Dialog description goes here.')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
    // Dialog should have role alertdialog
    expect(getByRole('alertdialog')).toBeInTheDocument();
  });
}); 