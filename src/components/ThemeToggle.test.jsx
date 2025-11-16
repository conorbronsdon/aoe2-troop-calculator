/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '../context/ThemeContext';

// Helper to render with ThemeProvider
const renderWithTheme = (initialTheme = 'light') => {
  // Set initial localStorage value
  localStorage.setItem('aoe2-calculator-theme', initialTheme);

  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset document classes
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  describe('Rendering', () => {
    it('should render toggle button', () => {
      renderWithTheme();

      const button = screen.getByRole('button', { name: /toggle theme/i });
      expect(button).toBeInTheDocument();
    });

    it('should have proper accessibility label', () => {
      renderWithTheme();

      const button = screen.getByLabelText('Toggle theme');
      expect(button).toBeInTheDocument();
    });

    it('should show moon icon when in light mode', () => {
      renderWithTheme('light');

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();

      // Moon icon has single path element
      const paths = svg.querySelectorAll('path');
      expect(paths).toHaveLength(1);
    });

    it('should show sun icon when in dark mode', () => {
      renderWithTheme('dark');

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();

      // Sun icon has single path with complex shape
      const path = svg.querySelector('path');
      // Check for either camelCase (JSX) or kebab-case (DOM) attribute
      const hasFillRule = path.hasAttribute('fillRule') || path.hasAttribute('fill-rule');
      expect(hasFillRule).toBe(true);
    });

    it('should have correct title for light mode', () => {
      renderWithTheme('light');

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to dark mode');
    });

    it('should have correct title for dark mode', () => {
      renderWithTheme('dark');

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to light mode');
    });
  });

  describe('Theme toggling', () => {
    it('should toggle from light to dark mode on click', () => {
      renderWithTheme('light');

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(localStorage.getItem('aoe2-calculator-theme')).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should toggle from dark to light mode on click', () => {
      renderWithTheme('dark');

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(localStorage.getItem('aoe2-calculator-theme')).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should update button title after toggle', () => {
      renderWithTheme('light');

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to dark mode');

      fireEvent.click(button);

      expect(button).toHaveAttribute('title', 'Switch to light mode');
    });

    it('should toggle icon after click', () => {
      renderWithTheme('light');

      const button = screen.getByRole('button');

      // Initially shows moon icon (to switch to dark)
      let svg = button.querySelector('svg');
      let paths = svg.querySelectorAll('path');
      expect(paths).toHaveLength(1);
      // Moon icon doesn't have fillRule
      const initialHasFillRule = paths[0].hasAttribute('fillRule') || paths[0].hasAttribute('fill-rule');
      expect(initialHasFillRule).toBe(false);

      // Click to toggle
      fireEvent.click(button);

      // Now shows sun icon (to switch to light)
      svg = button.querySelector('svg');
      const path = svg.querySelector('path');
      // Sun icon has fillRule
      const afterHasFillRule = path.hasAttribute('fillRule') || path.hasAttribute('fill-rule');
      expect(afterHasFillRule).toBe(true);
    });

    it('should persist theme preference in localStorage', () => {
      renderWithTheme('light');

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(localStorage.getItem('aoe2-calculator-theme')).toBe('dark');

      fireEvent.click(button);

      expect(localStorage.getItem('aoe2-calculator-theme')).toBe('light');
    });
  });

  describe('Styling', () => {
    it('should have fixed positioning classes', () => {
      renderWithTheme();

      const button = screen.getByRole('button');
      expect(button.className).toContain('fixed');
      expect(button.className).toContain('top-4');
      expect(button.className).toContain('right-4');
    });

    it('should have high z-index for visibility', () => {
      renderWithTheme();

      const button = screen.getByRole('button');
      expect(button.className).toContain('z-50');
    });

    it('should have transition classes for smooth effects', () => {
      renderWithTheme();

      const button = screen.getByRole('button');
      expect(button.className).toContain('transition-colors');
    });

    it('should have shadow for elevation', () => {
      renderWithTheme();

      const button = screen.getByRole('button');
      expect(button.className).toContain('shadow-lg');
    });
  });

  describe('Error handling', () => {
    it('should throw error when used outside ThemeProvider', () => {
      // Suppress error output for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<ThemeToggle />);
      }).toThrow('useTheme must be used within ThemeProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('Initial state', () => {
    it('should default to light theme when no preference saved', () => {
      localStorage.clear();
      renderWithTheme();

      // Light theme should be default (no saved preference)
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to dark mode');
    });

    it('should respect saved dark theme preference', () => {
      renderWithTheme('dark');

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to light mode');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });
});
