import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import CommentSection from '../src/components/CommentSection';
import React from 'react';

const EXPECTED_COMMENT_COUNT = 2;
const SECOND_CHILD_INDEX = 1;

describe('Comment Submission and Validation', () => {
  let alertSpy: ReturnType<typeof vitest.spyOn> | null = null;

  beforeEach(() => {
    // Mock window.alert before each test
    alertSpy = vitest.spyOn(global, 'alert').mockImplementation((message) => {
      console.log('Alert called with message:', message);
    });
  });

  afterEach(() => {
    if (alertSpy !== null) {
      alertSpy.mockRestore();
    }
  });

  it('should prevent form submission if name and comment are empty', () => {
    // Render the React component
    render(<CommentSection />);

    // Find the submit button and trigger a click event
    const submitButton = screen.getByRole('button', {
      name: /submit comment/i,
    });
    fireEvent.click(submitButton);

    // Check if alert was triggered due to validation failure
    expect(alertSpy).toHaveBeenCalledWith('Name and comment may not be empty!');
  });

  it('should add a new comment when form is filled', () => {
    // Render the React component
    render(<CommentSection />);

    // Fill in the form fields
    const nameInput = screen.getByLabelText(/your name/i);
    const commentInput = screen.getByLabelText(/your comment/i);

    fireEvent.change(nameInput, { target: { value: 'Hassan Ali' } });
    fireEvent.change(commentInput, { target: { value: 'Nice bear!' } });

    // Find the submit button and trigger a click event
    const submitButton = screen.getByRole('button', {
      name: /submit comment/i,
    });
    fireEvent.click(submitButton);

    // Verify the new comment is added
    const commentList = screen.getByRole('list', { name: /comments/i });
    expect(commentList.children.length).toBe(EXPECTED_COMMENT_COUNT);

    const secondComment = commentList.children[
      SECOND_CHILD_INDEX
    ] as HTMLElement;
    expect(secondComment.textContent).toContain('Hassan Ali');
    expect(secondComment.textContent).toContain('Nice bear!');
  });
});
