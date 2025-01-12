import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import CommentSection from '../src/components/CommentSection';
import React from 'react';

const EXPECTED_COMMENT_COUNT = 2;
const SECOND_CHILD_INDEX = 1;

describe('Comment Submission and Validation', () => {
  let alertSpy: ReturnType<typeof vitest.spyOn> | null = null;

  beforeEach(() => {
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
    render(<CommentSection />);

    const submitButton = screen.getByRole('button', {
      name: /submit comment/i,
    });
    fireEvent.click(submitButton);

    expect(alertSpy).toHaveBeenCalledWith('Name and comment may not be empty!');
  });

  it('should add a new comment when form is filled', () => {
    render(<CommentSection />);

    const nameInput = screen.getByLabelText(/your name/i);
    const commentInput = screen.getByLabelText(/your comment/i);

    fireEvent.change(nameInput, { target: { value: 'Hassan Ali' } });
    fireEvent.change(commentInput, { target: { value: 'Nice bear!' } });

    const submitButton = screen.getByRole('button', {
      name: /submit comment/i,
    });
    fireEvent.click(submitButton);

    const commentList = screen.getByRole('list', { name: /comments/i });
    expect(commentList.children.length).toBe(EXPECTED_COMMENT_COUNT);

    const secondComment = commentList.children[
      SECOND_CHILD_INDEX
    ] as HTMLElement;
    expect(secondComment.textContent).toContain('Hassan Ali');
    expect(secondComment.textContent).toContain('Nice bear!');
  });
});
