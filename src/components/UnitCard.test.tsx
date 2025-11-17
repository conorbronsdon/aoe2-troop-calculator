/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import UnitCard from './UnitCard';
import { Unit, ResourceCost } from '../types';

// Mock dependencies
vi.mock('../utils/calculations', () => ({
  calculateUnitCost: vi.fn((unit: Unit): ResourceCost => ({
    food: unit.cost.food,
    wood: unit.cost.wood,
    gold: unit.cost.gold,
    stone: unit.cost.stone,
  })),
  hasDiscount: vi.fn(() => false),
}));

vi.mock('../data/civilizations', () => ({
  civilizations: [
    {
      id: 'generic',
      name: 'Generic',
      bonuses: [],
    },
    {
      id: 'britons',
      name: 'Britons',
      bonuses: [
        {
          type: 'cost',
          units: ['archer'],
          description: 'Archers cost -10% wood',
        },
      ],
    },
  ],
}));

vi.mock('../data/units', () => ({
  getUnitById: vi.fn((id: string) => {
    const units: Record<string, { name: string }> = {
      militia: { name: 'Militia' },
      archer: { name: 'Archer' },
      knight: { name: 'Knight' },
      skirmisher: { name: 'Skirmisher' },
    };
    return units[id] || { name: id };
  }),
}));

// Mock stat calculator
vi.mock('../utils/statCalculator', () => ({
  calculateUnitStats: vi.fn(() => null), // Return null by default (no base stats)
  formatStatValue: vi.fn((_type: string, value: number) => value.toString()),
}));

// Mock UnitIcon to avoid complex SVG rendering
vi.mock('./UnitIcon', () => ({
  default: () => <div data-testid="unit-icon">Icon</div>,
}));

// Mock the logger to prevent console output
vi.mock('../utils/errorHandler', () => ({
  logger: {
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Create a custom wrapper that provides mock context
const mockDispatch = vi.fn();

interface MockStateConfig {
  resourceLimitMode: string;
  resourceLimits: ResourceCost;
  totalResourceLimit: number;
  populationCap: number;
  selectedAge: string;
  selectedCiv: string;
  previewCiv: string;
  displayMode: string;
  showTechPanel: boolean;
}

interface MockState {
  composition: Record<string, number>;
  fortificationComposition: Record<string, number>;
  researchedTechs: string[];
  config: MockStateConfig;
  savedCompositions: unknown[];
  comparisonMode: boolean;
  comparisonArmies: { a: Record<string, number>; b: Record<string, number> };
}

const createMockState = (composition: Record<string, number> = {}): MockState => ({
  composition,
  fortificationComposition: {},
  researchedTechs: [],
  config: {
    resourceLimitMode: 'total',
    resourceLimits: { food: 8000, wood: 8000, gold: 4000, stone: 0 },
    totalResourceLimit: 20000,
    populationCap: 200,
    selectedAge: 'imperial',
    selectedCiv: 'generic',
    previewCiv: 'generic',
    displayMode: 'units',
    showTechPanel: false,
  },
  savedCompositions: [],
  comparisonMode: false,
  comparisonArmies: { a: {}, b: {} },
});

// Mock the useArmy hook directly for simpler testing
vi.mock('../context/ArmyContext', async () => {
  const actual = await vi.importActual('../context/ArmyContext');
  return {
    ...actual,
    useArmy: vi.fn(),
  };
});

import { useArmy, ACTION_TYPES } from '../context/ArmyContext';

// Helper to render with mock context
const renderWithProvider = (unit: Unit, composition: Record<string, number> = {}) => {
  (useArmy as Mock).mockReturnValue({
    state: createMockState(composition),
    dispatch: mockDispatch,
  });

  return render(<UnitCard unit={unit} />);
};

describe('UnitCard', () => {
  const mockUnit: Unit = {
    id: 'archer',
    name: 'Archer',
    category: 'Archer',
    age: 'feudal',
    cost: { food: 25, wood: 45, gold: 0, stone: 0 },
    population: 1,
    counters: ['skirmisher'],
    weakTo: ['knight'],
  };

  const mockMilitia: Unit = {
    id: 'militia',
    name: 'Militia',
    category: 'Infantry',
    age: 'dark',
    cost: { food: 60, wood: 20, gold: 0, stone: 0 },
    population: 1,
    counters: [],
    weakTo: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  describe('Basic rendering', () => {
    it('should render unit name', () => {
      renderWithProvider(mockUnit);

      expect(screen.getByText('Archer')).toBeInTheDocument();
    });

    it('should not render unit age indicator (removed for cleaner UI)', () => {
      renderWithProvider(mockUnit);

      // Age indicator was removed to reduce card clutter
      expect(screen.queryByText('feudal Age')).not.toBeInTheDocument();
    });

    it('should render population cost', () => {
      renderWithProvider(mockUnit);

      const popBadge = screen.getByLabelText('Population cost: 1');
      expect(popBadge).toHaveTextContent('Pop: 1');
    });

    it('should render unit icon', () => {
      renderWithProvider(mockUnit);

      expect(screen.getByTestId('unit-icon')).toBeInTheDocument();
    });

    it('should render resource costs', () => {
      renderWithProvider(mockUnit);

      // Use getAllByText since there are sr-only and aria-hidden versions
      expect(screen.getAllByText('Food:').length).toBeGreaterThan(0);
      expect(screen.getByText('25')).toBeInTheDocument();
      expect(screen.getAllByText('Wood:').length).toBeGreaterThan(0);
      expect(screen.getByText('45')).toBeInTheDocument();
    });
  });

  describe('Quantity controls', () => {
    it('should render add button', () => {
      renderWithProvider(mockUnit);

      const addButton = screen.getByRole('button', { name: /add one archer/i });
      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveTextContent('+');
    });

    it('should render remove button', () => {
      renderWithProvider(mockUnit);

      const removeButton = screen.getByRole('button', { name: /remove one archer/i });
      expect(removeButton).toBeInTheDocument();
      expect(removeButton).toHaveTextContent('-');
    });

    it('should render quantity input', () => {
      renderWithProvider(mockUnit);

      const input = screen.getByRole('spinbutton', { name: /quantity of archer/i });
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'number');
      expect(input).toHaveAttribute('min', '0');
    });

    it('should initialize quantity to zero when not in composition', () => {
      renderWithProvider(mockUnit);

      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input).toHaveValue(0);
    });

    it('should show quantity from composition', () => {
      renderWithProvider(mockUnit, { archer: 5 });

      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input).toHaveValue(5);
    });

    it('should dispatch ADD_UNIT action when add button is clicked', () => {
      renderWithProvider(mockUnit);

      const addButton = screen.getByText('+');
      fireEvent.click(addButton);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: ACTION_TYPES.ADD_UNIT,
        unitId: 'archer',
      });
    });

    it('should dispatch REMOVE_UNIT action when remove button is clicked', () => {
      renderWithProvider(mockUnit, { archer: 2 });

      const removeButton = screen.getByText('-');
      fireEvent.click(removeButton);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: ACTION_TYPES.REMOVE_UNIT,
        unitId: 'archer',
      });
    });

    it('should dispatch SET_UNIT_QUANTITY when input is changed', () => {
      renderWithProvider(mockUnit);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '10' } });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: ACTION_TYPES.SET_UNIT_QUANTITY,
        unitId: 'archer',
        quantity: 10,
      });
    });

    it('should clamp quantity to maximum limit', () => {
      renderWithProvider(mockUnit);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '99999' } });

      // Should clamp to LIMITS.MAX_UNIT_QUANTITY (9999)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: ACTION_TYPES.SET_UNIT_QUANTITY,
        unitId: 'archer',
        quantity: 9999,
      });
    });

    it('should clamp negative values to zero', () => {
      renderWithProvider(mockUnit);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '-5' } });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: ACTION_TYPES.SET_UNIT_QUANTITY,
        unitId: 'archer',
        quantity: 0,
      });
    });

    it('should handle invalid input as zero', () => {
      renderWithProvider(mockUnit);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: 'abc' } });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: ACTION_TYPES.SET_UNIT_QUANTITY,
        unitId: 'archer',
        quantity: 0,
      });
    });
  });

  describe('More Info section (consolidated counters and stats)', () => {
    it('should render More Info toggle button when unit has counter info', () => {
      renderWithProvider(mockUnit);

      const toggleButton = screen.getByText('More Info');
      expect(toggleButton).toBeInTheDocument();
    });

    it('should not render More Info toggle when unit has no counter info and no stats', () => {
      renderWithProvider(mockMilitia);

      // mockMilitia has empty counters and weakTo arrays, and stats are mocked to null
      expect(screen.queryByText('More Info')).not.toBeInTheDocument();
    });

    it('should be collapsed by default', () => {
      renderWithProvider(mockUnit);

      expect(screen.queryByText(/Strong Against:/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Weak To:/)).not.toBeInTheDocument();
    });

    it('should expand when toggle button is clicked', () => {
      renderWithProvider(mockUnit);

      const toggleButton = screen.getByText('More Info');
      fireEvent.click(toggleButton);

      expect(screen.getByText(/Strong Against:/)).toBeInTheDocument();
      expect(screen.getByText(/Weak To:/)).toBeInTheDocument();
    });

    it('should display counter unit names', () => {
      renderWithProvider(mockUnit);

      const toggleButton = screen.getByText('More Info');
      fireEvent.click(toggleButton);

      expect(screen.getByText('Skirmisher')).toBeInTheDocument();
    });

    it('should display weakness unit names', () => {
      renderWithProvider(mockUnit);

      const toggleButton = screen.getByText('More Info');
      fireEvent.click(toggleButton);

      expect(screen.getByText('Knight')).toBeInTheDocument();
    });

    it('should collapse when toggle is clicked again', () => {
      renderWithProvider(mockUnit);

      const toggleButton = screen.getByText('More Info');
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);

      expect(screen.queryByText(/Strong Against:/)).not.toBeInTheDocument();
    });

    it('should show expand indicator when collapsed', () => {
      renderWithProvider(mockUnit);

      // Find the More Info section by its button text
      const moreInfoButton = screen.getByText('More Info');
      const buttonContainer = moreInfoButton.parentElement;

      // The expand indicator should be in the same container
      expect(buttonContainer!.textContent).toContain('►');
    });

    it('should show collapse indicator when expanded', () => {
      renderWithProvider(mockUnit);

      const toggleButton = screen.getByText('More Info');
      fireEvent.click(toggleButton);

      const buttonContainer = toggleButton.parentElement;
      expect(buttonContainer!.textContent).toContain('▼');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible labels for all interactive elements', () => {
      renderWithProvider(mockUnit);

      expect(screen.getByLabelText(/add one archer/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/remove one archer/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/quantity of archer/i)).toBeInTheDocument();
    });

    it('should have accessible population label', () => {
      renderWithProvider(mockUnit);

      expect(screen.getByLabelText('Population cost: 1')).toBeInTheDocument();
    });

    it('should render resource icons with aria-labels', () => {
      renderWithProvider(mockUnit);

      expect(screen.getByRole('img', { name: 'Food' })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Wood' })).toBeInTheDocument();
    });
  });

  describe('Styling and visual feedback', () => {
    it('should have hover shadow transition class', () => {
      const { container } = renderWithProvider(mockUnit);

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('hover:shadow-md');
      expect(card.className).toContain('transition-all');
    });

    it('should have border and rounded corners', () => {
      const { container } = renderWithProvider(mockUnit);

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('border');
      expect(card.className).toContain('rounded-lg');
    });

    it('should have proper button colors', () => {
      renderWithProvider(mockUnit);

      const addButton = screen.getByText('+');
      const removeButton = screen.getByText('-');

      expect(addButton.className).toContain('bg-green-500');
      expect(removeButton.className).toContain('bg-red-500');
    });
  });

  describe('Edge cases', () => {
    it('should handle unit with no counters array', () => {
      const unitNoCounters: Unit = {
        ...mockUnit,
        counters: undefined as unknown as string[],
        weakTo: undefined as unknown as string[],
      };

      renderWithProvider(unitNoCounters);

      // Should render without crashing
      expect(screen.getByText('Archer')).toBeInTheDocument();
      // More Info still shows if stats are available (mocked to null here)
      expect(screen.queryByText('More Info')).not.toBeInTheDocument();
    });

    it('should handle unit with empty counters array', () => {
      const unitEmptyCounters: Unit = {
        ...mockUnit,
        counters: [],
        weakTo: [],
      };

      renderWithProvider(unitEmptyCounters);

      expect(screen.getByText('Archer')).toBeInTheDocument();
      // More Info won't show if no counters/weakTo and stats are mocked to null
      expect(screen.queryByText('More Info')).not.toBeInTheDocument();
    });

    it('should handle only counters without weaknesses', () => {
      const unitOnlyCounters: Unit = {
        ...mockUnit,
        counters: ['skirmisher'],
        weakTo: [],
      };

      const { container } = renderWithProvider(unitOnlyCounters);

      const toggleButton = container.querySelector('button.text-xs') as HTMLElement;
      fireEvent.click(toggleButton);

      expect(screen.getByText(/Strong Against:/)).toBeInTheDocument();
      expect(screen.queryByText(/Weak To:/)).not.toBeInTheDocument();
    });

    it('should handle only weaknesses without counters', () => {
      const unitOnlyWeakTo: Unit = {
        ...mockUnit,
        counters: [],
        weakTo: ['knight'],
      };

      const { container } = renderWithProvider(unitOnlyWeakTo);

      const toggleButton = container.querySelector('button.text-xs') as HTMLElement;
      fireEvent.click(toggleButton);

      expect(screen.queryByText(/Strong Against:/)).not.toBeInTheDocument();
      expect(screen.getByText(/Weak To:/)).toBeInTheDocument();
    });
  });
});
