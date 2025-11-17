/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import UnitFilter from './UnitFilter';

// Mock the constants
vi.mock('../constants', () => ({
  SEARCH_DEBOUNCE_MS: 300,
}));

describe('UnitFilter', () => {
  const mockOnFilterChange = vi.fn();

  // Helper to expand the filter (starts collapsed by default)
  const expandFilter = () => {
    fireEvent.click(screen.getByText('► Expand'));
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    // Clear localStorage to ensure consistent test state
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  describe('Collapsible behavior', () => {
    it('should start collapsed by default', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expect(screen.getByText('► Expand')).toBeInTheDocument();
      // The input exists but is hidden (in collapsed state)
      const filterContent = document.getElementById('unit-filter-content');
      expect(filterContent).toHaveClass('hidden');
    });

    it('should expand when expand button is clicked', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      expect(screen.getByText('▼ Collapse')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search units by name...')).toBeInTheDocument();
    });

    it('should show active filter count badge', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      fireEvent.click(screen.getByText('Infantry'));
      // Should show badge with count 1
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should show collapsed summary with active filters', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      fireEvent.click(screen.getByText('Infantry'));
      fireEvent.click(screen.getByText('▼ Collapse'));
      // Should show summary of active filters (check for the summary icon prefix)
      expect(screen.getByText(/📁.*Infantry/)).toBeInTheDocument();
    });
  });

  describe('Basic rendering', () => {
    it('should render filter heading', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expect(screen.getByText('Filter Units')).toBeInTheDocument();
    });

    it('should render search input when expanded', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      expect(screen.getByPlaceholderText('Search units by name...')).toBeInTheDocument();
    });

    it('should render category buttons when expanded', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      expect(screen.getByText('Infantry')).toBeInTheDocument();
      expect(screen.getByText('Cavalry')).toBeInTheDocument();
      expect(screen.getByText('Archer')).toBeInTheDocument();
      expect(screen.getByText('Siege')).toBeInTheDocument();
      expect(screen.getByText('Naval')).toBeInTheDocument();
      expect(screen.getByText('Unique')).toBeInTheDocument();
      expect(screen.getByText('Other')).toBeInTheDocument();
    });

    it('should render hide naval checkbox when expanded', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      expect(screen.getByText('Hide Naval Units')).toBeInTheDocument();
    });

    it('should render cost type dropdown with all options when expanded', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      expect(screen.getByText('Cost Type')).toBeInTheDocument();
      expect(screen.getByText('All Costs')).toBeInTheDocument();
      expect(screen.getByText('Trash Units (No Gold)')).toBeInTheDocument();
      expect(screen.getByText('Gold Units')).toBeInTheDocument();
      expect(screen.getByText('Low Cost (<100 total)')).toBeInTheDocument();
    });

    it('should render age filter dropdown with all options when expanded', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(screen.getByText('All Ages')).toBeInTheDocument();
      expect(screen.getByText('Dark Age')).toBeInTheDocument();
      expect(screen.getByText('Feudal Age')).toBeInTheDocument();
      expect(screen.getByText('Castle Age')).toBeInTheDocument();
      expect(screen.getByText('Imperial Age')).toBeInTheDocument();
    });

    it('should not show clear filters button initially', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expect(screen.queryByText('Clear')).not.toBeInTheDocument();
    });
  });

  describe('Search input', () => {
    it('should update search term on input', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const input = screen.getByPlaceholderText('Search units by name...');

      fireEvent.change(input, { target: { value: 'archer' } });

      expect(input).toHaveValue('archer');
    });

    it('should debounce search filter changes', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const input = screen.getByPlaceholderText('Search units by name...');

      fireEvent.change(input, { target: { value: 'archer' } });

      // Not called immediately
      expect(mockOnFilterChange).not.toHaveBeenCalled();

      // Fast forward past debounce
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({ searchTerm: 'archer' })
      );
    });

    it('should show clear filters button when search is active', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const input = screen.getByPlaceholderText('Search units by name...');

      fireEvent.change(input, { target: { value: 'knight' } });

      expect(screen.getByText('Clear')).toBeInTheDocument();
    });
  });

  describe('Category selection', () => {
    it('should toggle category when clicked', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const infantryButton = screen.getByText('Infantry');

      fireEvent.click(infantryButton);

      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({ categories: ['Infantry'] })
      );
    });

    it('should allow multiple categories', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();

      fireEvent.click(screen.getByText('Infantry'));
      fireEvent.click(screen.getByText('Cavalry'));

      expect(mockOnFilterChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ categories: ['Infantry', 'Cavalry'] })
      );
    });

    it('should remove category when clicked again', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();

      fireEvent.click(screen.getByText('Infantry'));
      fireEvent.click(screen.getByText('Infantry'));

      expect(mockOnFilterChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ categories: [] })
      );
    });

    it('should show clear filters button when category is selected', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();

      fireEvent.click(screen.getByText('Archer'));

      expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    it('should apply selected styling to active categories', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const infantryButton = screen.getByText('Infantry');

      expect(infantryButton).toHaveClass('bg-gray-200');

      fireEvent.click(infantryButton);

      expect(infantryButton).toHaveClass('bg-blue-500');
    });
  });

  describe('Cost type filter', () => {
    it('should update cost type on selection', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const costTypeSelect = screen.getAllByRole('combobox')[0];

      fireEvent.change(costTypeSelect, { target: { value: 'trash' } });

      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({ costType: 'trash' })
      );
    });

    it('should show clear filters button when cost type is not all', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const costTypeSelect = screen.getAllByRole('combobox')[0];

      fireEvent.change(costTypeSelect, { target: { value: 'gold' } });

      expect(screen.getByText('Clear')).toBeInTheDocument();
    });
  });

  describe('Age filter', () => {
    it('should update age filter on selection', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const ageSelect = screen.getAllByRole('combobox')[1];

      fireEvent.change(ageSelect, { target: { value: 'castle' } });

      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({ ageFilter: 'castle' })
      );
    });

    it('should show clear filters button when age is not all', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const ageSelect = screen.getAllByRole('combobox')[1];

      fireEvent.change(ageSelect, { target: { value: 'imperial' } });

      expect(screen.getByText('Clear')).toBeInTheDocument();
    });
  });

  describe('Hide naval checkbox', () => {
    it('should toggle hide naval on click', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const checkbox = screen.getByRole('checkbox');

      fireEvent.click(checkbox);

      expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({ hideNaval: true }));
    });

    it('should show clear filters button when hide naval is checked', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const checkbox = screen.getByRole('checkbox');

      fireEvent.click(checkbox);

      expect(screen.getByText('Clear')).toBeInTheDocument();
    });
  });

  describe('Clear filters', () => {
    it('should clear all filters when clicked', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();

      // Apply some filters
      fireEvent.click(screen.getByText('Infantry'));
      mockOnFilterChange.mockClear();

      // Click clear
      fireEvent.click(screen.getByText('Clear'));

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        searchTerm: '',
        categories: [],
        costType: 'all',
        ageFilter: 'all',
        hideNaval: false,
      });
    });

    it('should reset all form inputs', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();
      const searchInput = screen.getByPlaceholderText('Search units by name...');
      const checkbox = screen.getByRole('checkbox');

      // Apply filters
      fireEvent.change(searchInput, { target: { value: 'test' } });
      fireEvent.click(checkbox);
      fireEvent.click(screen.getByText('Cavalry'));

      // Clear
      fireEvent.click(screen.getByText('Clear'));

      // Verify resets
      expect(searchInput).toHaveValue('');
      expect(checkbox).not.toBeChecked();
      expect(screen.getByText('Cavalry')).toHaveClass('bg-gray-200');
    });

    it('should hide clear button after clearing', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();

      fireEvent.click(screen.getByText('Infantry'));
      fireEvent.click(screen.getByText('Clear'));

      expect(screen.queryByText('Clear')).not.toBeInTheDocument();
    });
  });

  describe('Combined filters', () => {
    it('should maintain other filters when changing one', () => {
      render(<UnitFilter onFilterChange={mockOnFilterChange} />);
      expandFilter();

      // Set up initial category
      fireEvent.click(screen.getByText('Infantry'));
      mockOnFilterChange.mockClear();

      // Change age filter
      const ageSelect = screen.getAllByRole('combobox')[1];
      fireEvent.change(ageSelect, { target: { value: 'feudal' } });

      // Should maintain category
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          categories: ['Infantry'],
          ageFilter: 'feudal',
        })
      );
    });
  });
});
