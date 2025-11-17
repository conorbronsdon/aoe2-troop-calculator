import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import PresetSelector from './PresetSelector';
import { ArmyProvider } from '../context/ArmyContext';
import { presets, presetCategories } from '../data/presets';
import { ReactNode } from 'react';

// Wrapper component for testing
const renderWithProvider = (component: ReactNode): RenderResult =>
  render(<ArmyProvider>{component}</ArmyProvider>);

describe('PresetSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the component title', () => {
      renderWithProvider(<PresetSelector />);
      expect(screen.getByText('Preset Army Compositions')).toBeInTheDocument();
    });

    it('should render category dropdown', () => {
      renderWithProvider(<PresetSelector />);
      expect(screen.getByLabelText('Category')).toBeInTheDocument();
    });

    it('should render build dropdown', () => {
      renderWithProvider(<PresetSelector />);
      expect(screen.getByLabelText('Build')).toBeInTheDocument();
    });

    it('should render all category options', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category');

      presetCategories.forEach((category) => {
        expect(categorySelect).toHaveTextContent(category.name);
      });
    });

    it('should render action buttons', () => {
      renderWithProvider(<PresetSelector />);
      expect(screen.getByText('Load Preset')).toBeInTheDocument();
      expect(screen.getByText('Merge with Current')).toBeInTheDocument();
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    it('should disable action buttons when no preset is selected', () => {
      renderWithProvider(<PresetSelector />);
      expect(screen.getByText('Load Preset')).toBeDisabled();
      expect(screen.getByText('Merge with Current')).toBeDisabled();
    });

    it('should render quick stats', () => {
      renderWithProvider(<PresetSelector />);
      expect(screen.getByText(`${presets.length}`)).toBeInTheDocument();
      expect(screen.getByText('total presets')).toBeInTheDocument();
    });

    it('should render description text', () => {
      renderWithProvider(<PresetSelector />);
      expect(
        screen.getByText(/Load pre-configured meta builds and strategies/i)
      ).toBeInTheDocument();
    });
  });

  describe('category selection', () => {
    it('should enable build dropdown when category is selected', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      expect(buildSelect).toBeDisabled();

      fireEvent.change(categorySelect, { target: { value: 'castle-age-rushes' } });

      expect(buildSelect).not.toBeDisabled();
    });

    it('should show category description when selected', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'castle-age-rushes' } });

      const category = presetCategories.find((c) => c.id === 'castle-age-rushes');
      expect(screen.getByText(category!.description)).toBeInTheDocument();
    });

    it('should populate build dropdown with category presets', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'beginner' } });

      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;
      const beginnerPresets = presets.filter((p) => p.category === 'beginner');

      beginnerPresets.forEach((preset) => {
        expect(buildSelect).toHaveTextContent(preset.name);
      });
    });

    it('should reset build selection when category changes', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      // Select category and build
      fireEvent.change(categorySelect, { target: { value: 'beginner' } });
      const firstPreset = presets.find((p) => p.category === 'beginner');
      fireEvent.change(buildSelect, { target: { value: firstPreset!.id } });

      // Change category
      fireEvent.change(categorySelect, { target: { value: 'castle-age-rushes' } });

      // Build should be reset
      expect(buildSelect.value).toBe('');
    });
  });

  describe('preset selection and preview', () => {
    it('should show preview when preset is selected', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'castle-age-rushes' } });
      fireEvent.change(buildSelect, { target: { value: 'knight-rush' } });

      // Check for description which only appears in preview
      expect(
        screen.getByText(/Classic Castle Age aggression with heavy cavalry/i)
      ).toBeInTheDocument();
    });

    it('should show recommended civilizations in preview', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'castle-age-rushes' } });
      fireEvent.change(buildSelect, { target: { value: 'knight-rush' } });

      expect(screen.getByText(/Recommended for:/i)).toBeInTheDocument();
      // Franks, Teutons, Lithuanians should be in the recommendation list
      expect(screen.getByText(/Franks, Teutons, Lithuanians/i)).toBeInTheDocument();
    });

    it('should show unit composition in preview', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'castle-age-rushes' } });
      fireEvent.change(buildSelect, { target: { value: 'knight-rush' } });

      expect(screen.getByText(/10x/)).toBeInTheDocument();
      // Check that Knight appears in the unit list (not just dropdown)
      expect(screen.getByText(/Units.*14 total/i)).toBeInTheDocument();
    });

    it('should show total cost in preview', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'castle-age-rushes' } });
      fireEvent.change(buildSelect, { target: { value: 'knight-rush' } });

      expect(screen.getByText('Total Cost:')).toBeInTheDocument();
      expect(screen.getByText('Food:')).toBeInTheDocument();
      expect(screen.getByText('Gold:')).toBeInTheDocument();
    });

    it('should show age information in preview', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'castle-age-rushes' } });
      fireEvent.change(buildSelect, { target: { value: 'knight-rush' } });

      expect(screen.getByText('Age:')).toBeInTheDocument();
      expect(screen.getByText('castle')).toBeInTheDocument();
    });

    it('should enable action buttons when preset is selected', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'beginner' } });
      fireEvent.change(buildSelect, { target: { value: 'trash-army' } });

      expect(screen.getByText('Load Preset')).not.toBeDisabled();
      expect(screen.getByText('Merge with Current')).not.toBeDisabled();
    });
  });

  describe('loading presets', () => {
    it('should show success message when preset is loaded', async () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'beginner' } });
      fireEvent.change(buildSelect, { target: { value: 'trash-army' } });
      fireEvent.click(screen.getByText('Load Preset'));

      await waitFor(() => {
        expect(screen.getByText(/✓ Loaded: Trash Army/i)).toBeInTheDocument();
      });
    });

    it('should reset selections after loading preset', async () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'beginner' } });
      fireEvent.change(buildSelect, { target: { value: 'trash-army' } });
      fireEvent.click(screen.getByText('Load Preset'));

      await waitFor(() => {
        expect(categorySelect.value).toBe('');
        expect(buildSelect.value).toBe('');
      });
    });

    it('should show success message when preset is merged', async () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      fireEvent.change(categorySelect, { target: { value: 'beginner' } });
      fireEvent.change(buildSelect, { target: { value: 'trash-army' } });
      fireEvent.click(screen.getByText('Merge with Current'));

      await waitFor(() => {
        expect(screen.getByText(/✓ Merged: Trash Army/i)).toBeInTheDocument();
      });
    });

    it('should not load preset when button is disabled', () => {
      renderWithProvider(<PresetSelector />);

      // Button should be disabled when no preset is selected
      const loadButton = screen.getByText('Load Preset');
      expect(loadButton).toBeDisabled();

      // Clicking a disabled button should have no effect
      fireEvent.click(loadButton);

      // No success message should appear
      expect(screen.queryByText(/✓ Loaded/i)).not.toBeInTheDocument();
    });
  });

  describe('clear functionality', () => {
    it('should clear all selections when Clear button is clicked', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      // Make selections
      fireEvent.change(categorySelect, { target: { value: 'beginner' } });
      fireEvent.change(buildSelect, { target: { value: 'trash-army' } });

      // Click clear
      fireEvent.click(screen.getByText('Clear'));

      expect(categorySelect.value).toBe('');
      expect(buildSelect.value).toBe('');
    });

    it('should hide preview when Clear button is clicked', () => {
      renderWithProvider(<PresetSelector />);
      const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      // Make selections to show preview
      fireEvent.change(categorySelect, { target: { value: 'beginner' } });
      fireEvent.change(buildSelect, { target: { value: 'trash-army' } });

      // Verify preview is shown (description only appears in preview)
      expect(screen.getByText(/Gold-free composition/i)).toBeInTheDocument();

      // Click clear
      fireEvent.click(screen.getByText('Clear'));

      // Preview should be hidden (description no longer visible)
      expect(screen.queryByText(/Gold-free composition/i)).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have labels for all form controls', () => {
      renderWithProvider(<PresetSelector />);

      expect(screen.getByLabelText('Category')).toBeInTheDocument();
      expect(screen.getByLabelText('Build')).toBeInTheDocument();
    });

    it('should have proper button text', () => {
      renderWithProvider(<PresetSelector />);

      expect(screen.getByText('Load Preset')).toBeInTheDocument();
      expect(screen.getByText('Merge with Current')).toBeInTheDocument();
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    it('should indicate disabled state on build dropdown', () => {
      renderWithProvider(<PresetSelector />);
      const buildSelect = screen.getByLabelText('Build') as HTMLSelectElement;

      expect(buildSelect).toBeDisabled();
    });
  });
});
