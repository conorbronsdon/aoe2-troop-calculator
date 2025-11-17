import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { logger } from '../utils/errorHandler';
import { ResourceLimits, DisplayMode, Age } from '../types';

// =============================================================================
// Type Definitions
// =============================================================================

export interface ArmyConfig {
  resourceLimitMode: 'total' | 'individual';
  resourceLimits: ResourceLimits;
  totalResourceLimit: number;
  populationCap: number;
  selectedAge: Age;
  selectedCiv: string;
  previewCiv: string;
  alliedCivs: string[];
  displayMode: DisplayMode;
  showTechPanel: boolean;
  showUnitCardStats: boolean;
  showTeamBonuses: boolean;
}

export interface ArmyState {
  composition: Record<string, number>;
  fortificationComposition: Record<string, number>;
  researchedTechs: string[];
  config: ArmyConfig;
  savedCompositions: SavedComposition[];
  comparisonMode: boolean;
  comparisonArmies: {
    a: Record<string, number>;
    b: Record<string, number>;
  };
}

export interface SavedComposition {
  id: string;
  name: string;
  composition: Record<string, number>;
  config: Partial<ArmyConfig>;
  timestamp: number;
}

export interface HistoryEntry {
  composition: Record<string, number>;
  config: ArmyConfig;
  researchedTechs: string[];
}

// Action types as discriminated union
export type ArmyAction =
  | { type: 'ADD_UNIT'; unitId: string }
  | { type: 'REMOVE_UNIT'; unitId: string }
  | { type: 'SET_UNIT_QUANTITY'; unitId: string; quantity: number | string }
  | { type: 'RESET_COMPOSITION' }
  | { type: 'ADD_FORTIFICATION'; fortificationId: string }
  | { type: 'REMOVE_FORTIFICATION'; fortificationId: string }
  | { type: 'SET_FORTIFICATION_QUANTITY'; fortificationId: string; quantity: number | string }
  | { type: 'RESET_FORTIFICATION_COMPOSITION' }
  | { type: 'UPDATE_CONFIG'; config: Partial<ArmyConfig> }
  | {
      type: 'LOAD_COMPOSITION';
      composition: Record<string, number>;
      config?: Partial<ArmyConfig>;
    }
  | { type: 'SET_SAVED_COMPOSITIONS'; compositions: SavedComposition[] }
  | { type: 'TOGGLE_COMPARISON_MODE' }
  | { type: 'UPDATE_COMPARISON_ARMY'; side: 'a' | 'b'; composition: Record<string, number> }
  | { type: 'APPLY_CIVILIZATION'; civId: string }
  | { type: 'SET_DISPLAY_MODE'; mode: DisplayMode }
  | {
      type: 'IMPORT_COMPOSITION';
      composition: Record<string, number>;
      config: Partial<ArmyConfig>;
      mode: 'replace' | 'merge';
    }
  | { type: 'RESEARCH_TECH'; techId: string }
  | { type: 'UNRESEARCH_TECH'; techId: string }
  | { type: 'SET_RESEARCHED_TECHS'; techIds: string[] }
  | { type: 'RESET_TECHS' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET_ALLIED_CIVS'; civIds: string[] }
  | { type: 'TOGGLE_FORTIFICATION_MODE' };

export interface ArmyContextValue {
  state: ArmyState;
  dispatch: (action: ArmyAction) => void;
  canUndo: boolean;
  canRedo: boolean;
  historyLength: number;
  historyIndex: number;
}

export interface ArmyProviderProps {
  children: React.ReactNode;
}

// =============================================================================
// Action Types Constants
// =============================================================================

export const ACTION_TYPES = {
  ADD_UNIT: 'ADD_UNIT',
  REMOVE_UNIT: 'REMOVE_UNIT',
  SET_UNIT_QUANTITY: 'SET_UNIT_QUANTITY',
  RESET_COMPOSITION: 'RESET_COMPOSITION',
  ADD_FORTIFICATION: 'ADD_FORTIFICATION',
  REMOVE_FORTIFICATION: 'REMOVE_FORTIFICATION',
  SET_FORTIFICATION_QUANTITY: 'SET_FORTIFICATION_QUANTITY',
  RESET_FORTIFICATION_COMPOSITION: 'RESET_FORTIFICATION_COMPOSITION',
  UPDATE_CONFIG: 'UPDATE_CONFIG',
  LOAD_COMPOSITION: 'LOAD_COMPOSITION',
  SET_SAVED_COMPOSITIONS: 'SET_SAVED_COMPOSITIONS',
  TOGGLE_COMPARISON_MODE: 'TOGGLE_COMPARISON_MODE',
  UPDATE_COMPARISON_ARMY: 'UPDATE_COMPARISON_ARMY',
  APPLY_CIVILIZATION: 'APPLY_CIVILIZATION',
  SET_DISPLAY_MODE: 'SET_DISPLAY_MODE',
  IMPORT_COMPOSITION: 'IMPORT_COMPOSITION',
  RESEARCH_TECH: 'RESEARCH_TECH',
  UNRESEARCH_TECH: 'UNRESEARCH_TECH',
  SET_RESEARCHED_TECHS: 'SET_RESEARCHED_TECHS',
  RESET_TECHS: 'RESET_TECHS',
  UNDO: 'UNDO',
  REDO: 'REDO',
  SET_ALLIED_CIVS: 'SET_ALLIED_CIVS',
  TOGGLE_FORTIFICATION_MODE: 'TOGGLE_FORTIFICATION_MODE',
} as const;

// Maximum number of undo history entries
const MAX_HISTORY_SIZE = 50;

// =============================================================================
// Initial State
// =============================================================================

const initialState: ArmyState = {
  composition: {},
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
    alliedCivs: [],
    displayMode: 'units',
    showTechPanel: false,
    showUnitCardStats: false,
    showTeamBonuses: false,
  },
  savedCompositions: [],
  comparisonMode: false,
  comparisonArmies: { a: {}, b: {} },
};

// =============================================================================
// Context Creation
// =============================================================================

const ArmyContext = createContext<ArmyContextValue | undefined>(undefined);

// =============================================================================
// Reducer Function
// =============================================================================

function armyReducer(state: ArmyState, action: ArmyAction): ArmyState {
  switch (action.type) {
    case ACTION_TYPES.ADD_UNIT:
      return {
        ...state,
        composition: {
          ...state.composition,
          [action.unitId]: (state.composition[action.unitId] || 0) + 1,
        },
      };

    case ACTION_TYPES.REMOVE_UNIT: {
      const newQuantity = Math.max(0, (state.composition[action.unitId] || 0) - 1);
      if (newQuantity === 0) {
        const { [action.unitId]: _, ...rest } = state.composition;
        return { ...state, composition: rest };
      }
      return {
        ...state,
        composition: { ...state.composition, [action.unitId]: newQuantity },
      };
    }

    case ACTION_TYPES.SET_UNIT_QUANTITY: {
      const num = parseInt(String(action.quantity)) || 0;
      if (num === 0) {
        const { [action.unitId]: _, ...rest } = state.composition;
        return { ...state, composition: rest };
      }
      return {
        ...state,
        composition: { ...state.composition, [action.unitId]: num },
      };
    }

    case ACTION_TYPES.RESET_COMPOSITION:
      return { ...state, composition: {} };

    case ACTION_TYPES.ADD_FORTIFICATION:
      return {
        ...state,
        fortificationComposition: {
          ...state.fortificationComposition,
          [action.fortificationId]:
            (state.fortificationComposition[action.fortificationId] || 0) + 1,
        },
      };

    case ACTION_TYPES.REMOVE_FORTIFICATION: {
      const newQuantity = Math.max(
        0,
        (state.fortificationComposition[action.fortificationId] || 0) - 1
      );
      if (newQuantity === 0) {
        const { [action.fortificationId]: _, ...rest } = state.fortificationComposition;
        return { ...state, fortificationComposition: rest };
      }
      return {
        ...state,
        fortificationComposition: {
          ...state.fortificationComposition,
          [action.fortificationId]: newQuantity,
        },
      };
    }

    case ACTION_TYPES.SET_FORTIFICATION_QUANTITY: {
      const num = parseInt(String(action.quantity)) || 0;
      if (num === 0) {
        const { [action.fortificationId]: _, ...rest } = state.fortificationComposition;
        return { ...state, fortificationComposition: rest };
      }
      return {
        ...state,
        fortificationComposition: {
          ...state.fortificationComposition,
          [action.fortificationId]: num,
        },
      };
    }

    case ACTION_TYPES.RESET_FORTIFICATION_COMPOSITION:
      return { ...state, fortificationComposition: {} };

    case ACTION_TYPES.SET_DISPLAY_MODE:
      return {
        ...state,
        config: {
          ...state.config,
          displayMode: action.mode,
        },
      };

    case ACTION_TYPES.TOGGLE_FORTIFICATION_MODE:
      return {
        ...state,
        config: {
          ...state.config,
          displayMode: state.config.displayMode === 'fortifications' ? 'units' : 'fortifications',
        },
      };

    case ACTION_TYPES.UPDATE_CONFIG:
      return {
        ...state,
        config: { ...state.config, ...action.config },
      };

    case ACTION_TYPES.LOAD_COMPOSITION:
      return {
        ...state,
        composition: action.composition,
        config: action.config ? { ...state.config, ...action.config } : state.config,
      };

    case ACTION_TYPES.SET_SAVED_COMPOSITIONS:
      return {
        ...state,
        savedCompositions: action.compositions,
      };

    case ACTION_TYPES.TOGGLE_COMPARISON_MODE:
      return {
        ...state,
        comparisonMode: !state.comparisonMode,
      };

    case ACTION_TYPES.UPDATE_COMPARISON_ARMY:
      return {
        ...state,
        comparisonArmies: {
          ...state.comparisonArmies,
          [action.side]: action.composition,
        },
      };

    case ACTION_TYPES.APPLY_CIVILIZATION:
      return {
        ...state,
        config: {
          ...state.config,
          selectedCiv: action.civId,
          previewCiv: action.civId,
        },
      };

    case ACTION_TYPES.RESEARCH_TECH:
      if (state.researchedTechs.includes(action.techId)) {
        return state;
      }
      return {
        ...state,
        researchedTechs: [...state.researchedTechs, action.techId],
      };

    case ACTION_TYPES.UNRESEARCH_TECH:
      return {
        ...state,
        researchedTechs: state.researchedTechs.filter((id) => id !== action.techId),
      };

    case ACTION_TYPES.SET_RESEARCHED_TECHS:
      return {
        ...state,
        researchedTechs: action.techIds || [],
      };

    case ACTION_TYPES.RESET_TECHS:
      return {
        ...state,
        researchedTechs: [],
      };

    case ACTION_TYPES.IMPORT_COMPOSITION: {
      const { composition: importedComposition, config: importedConfig, mode } = action;

      let newComposition: Record<string, number>;
      if (mode === 'merge') {
        newComposition = { ...state.composition };
        Object.entries(importedComposition).forEach(([unitId, quantity]) => {
          newComposition[unitId] = (newComposition[unitId] || 0) + quantity;
        });
      } else {
        newComposition = importedComposition;
      }

      const newConfig: ArmyConfig = {
        ...state.config,
        ...importedConfig,
        previewCiv:
          importedConfig.selectedCiv || importedConfig.previewCiv || state.config.selectedCiv,
      };

      return {
        ...state,
        composition: newComposition,
        config: newConfig,
      };
    }

    case ACTION_TYPES.SET_ALLIED_CIVS: {
      const alliedCivs = [...new Set(action.civIds || [])].slice(0, 3);
      const filteredAllies = alliedCivs.filter((civId) => civId !== state.config.selectedCiv);
      return {
        ...state,
        config: {
          ...state.config,
          alliedCivs: filteredAllies,
        },
      };
    }

    default:
      logger.warn(`Unknown action type: ${(action as { type: string }).type}`);
      return state;
  }
}

// =============================================================================
// Provider Component
// =============================================================================

export function ArmyProvider({ children }: ArmyProviderProps): React.ReactElement {
  const [state, baseDispatch] = useReducer(armyReducer, initialState);

  const historyRef = useRef<HistoryEntry[]>([
    {
      composition: initialState.composition,
      config: initialState.config,
      researchedTechs: initialState.researchedTechs,
    },
  ]);
  const historyIndexRef = useRef(0);

  const dispatch = useCallback(
    (action: ArmyAction) => {
      if (action.type === ACTION_TYPES.UNDO) {
        if (historyIndexRef.current > 0) {
          historyIndexRef.current--;
          const previousState = historyRef.current[historyIndexRef.current];
          baseDispatch({
            type: ACTION_TYPES.LOAD_COMPOSITION,
            composition: previousState.composition,
            config: previousState.config,
          });
          baseDispatch({
            type: ACTION_TYPES.SET_RESEARCHED_TECHS,
            techIds: previousState.researchedTechs,
          });
          logger.debug('Undo performed', {
            index: historyIndexRef.current,
            historyLength: historyRef.current.length,
          });
        }
        return;
      }

      if (action.type === ACTION_TYPES.REDO) {
        if (historyIndexRef.current < historyRef.current.length - 1) {
          historyIndexRef.current++;
          const nextState = historyRef.current[historyIndexRef.current];
          baseDispatch({
            type: ACTION_TYPES.LOAD_COMPOSITION,
            composition: nextState.composition,
            config: nextState.config,
          });
          baseDispatch({
            type: ACTION_TYPES.SET_RESEARCHED_TECHS,
            techIds: nextState.researchedTechs,
          });
          logger.debug('Redo performed', {
            index: historyIndexRef.current,
            historyLength: historyRef.current.length,
          });
        }
        return;
      }

      baseDispatch(action);
    },
    [baseDispatch]
  );

  const updateHistory = useCallback((newState: ArmyState) => {
    const currentHistoryState = historyRef.current[historyIndexRef.current];
    const hasChanged =
      JSON.stringify(newState.composition) !== JSON.stringify(currentHistoryState.composition) ||
      JSON.stringify(newState.config) !== JSON.stringify(currentHistoryState.config) ||
      JSON.stringify(newState.researchedTechs) !==
        JSON.stringify(currentHistoryState.researchedTechs);

    if (hasChanged) {
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);

      historyRef.current.push({
        composition: { ...newState.composition },
        config: { ...newState.config },
        researchedTechs: [...newState.researchedTechs],
      });

      if (historyRef.current.length > MAX_HISTORY_SIZE) {
        historyRef.current = historyRef.current.slice(-MAX_HISTORY_SIZE);
      }

      historyIndexRef.current = historyRef.current.length - 1;

      logger.debug('History updated', {
        index: historyIndexRef.current,
        historyLength: historyRef.current.length,
      });
    }
  }, []);

  useEffect(() => {
    updateHistory(state);
  }, [state, updateHistory]);

  useEffect(() => {
    logger.debug('Army state updated', state);
  }, [state]);

  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  const contextValue: ArmyContextValue = {
    state,
    dispatch,
    canUndo,
    canRedo,
    historyLength: historyRef.current.length,
    historyIndex: historyIndexRef.current,
  };

  return <ArmyContext.Provider value={contextValue}>{children}</ArmyContext.Provider>;
}

// =============================================================================
// Custom Hook
// =============================================================================

export const useArmy = (): ArmyContextValue => {
  const context = useContext(ArmyContext);
  if (!context) {
    throw new Error('useArmy must be used within ArmyProvider');
  }
  return context;
};
