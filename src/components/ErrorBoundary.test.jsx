/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

// Mock the logger to prevent actual logging during tests
vi.mock('../utils/errorHandler', () => ({
  logger: {
    error: vi.fn()
  }
}));

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
};

// Component that throws a non-Error object
const ThrowNonError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw 'String error'; // eslint-disable-line no-throw-literal
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  let originalLocation;
  let consoleErrorSpy;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock window.location.reload
    originalLocation = window.location;
    delete window.location;
    window.location = { reload: vi.fn() };

    // Suppress React error boundary console errors during tests
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    window.location = originalLocation;
    consoleErrorSpy.mockRestore();
  });

  describe('Normal rendering', () => {
    it('should render children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child">Child content</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
    });
  });

  describe('Error handling', () => {
    it('should display error UI when child throws an error', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
    });

    it('should display the error message', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('should handle non-Error objects thrown', () => {
      render(
        <ErrorBoundary>
          <ThrowNonError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should show error emoji with proper accessibility', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const emoji = screen.getByRole('img', { name: 'Error' });
      expect(emoji).toBeInTheDocument();
    });

    it('should reassure user that data is safe', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(/army composition data is safe/i)).toBeInTheDocument();
    });
  });

  describe('Recovery actions', () => {
    it('should render Try Again button', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const tryAgainButton = screen.getByRole('button', { name: /try to recover/i });
      expect(tryAgainButton).toBeInTheDocument();
      expect(tryAgainButton).toHaveTextContent('Try Again');
    });

    it('should render Reload Page button', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByRole('button', { name: /reload the page/i });
      expect(reloadButton).toBeInTheDocument();
      expect(reloadButton).toHaveTextContent('Reload Page');
    });

    it('should call window.location.reload when Reload Page is clicked', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByText('Reload Page');
      fireEvent.click(reloadButton);

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });

    it('should reset error state when Try Again is clicked', () => {
      // Create a component that can be controlled externally
      let shouldThrow = true;
      const ControlledThrow = () => {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return <div>Recovered successfully</div>;
      };

      const { rerender } = render(
        <ErrorBoundary>
          <ControlledThrow />
        </ErrorBoundary>
      );

      // Verify error UI is shown
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Update the controlled state before clicking
      shouldThrow = false;

      // Click Try Again - this resets error state and re-renders children
      const tryAgainButton = screen.getByText('Try Again');
      fireEvent.click(tryAgainButton);

      // Force a rerender to pick up the state change
      rerender(
        <ErrorBoundary>
          <ControlledThrow />
        </ErrorBoundary>
      );

      // Error UI should be gone, normal content should show
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.getByText('Recovered successfully')).toBeInTheDocument();
    });
  });

  describe('GitHub issue link', () => {
    it('should include link to report issues', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const link = screen.getByRole('link', { name: /report an issue/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://github.com/conorbronsdon/aoe2-troop-calculator/issues');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button labels', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByLabelText(/try to recover/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/reload the page/i)).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Something went wrong');
    });
  });
});
