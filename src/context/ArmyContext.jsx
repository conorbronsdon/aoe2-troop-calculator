import { createContext, useReducer, useContext, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { logger } from '../utils/errorHandler';

const ArmyContext = createContext();

// Initial state
const initialState = {
  composition: {},
  fortificationComposition: {}, // Separate composition for fortifications
  researchedTechs: [], // Array of researched technology IDs
  config: {
    resourceLimitMode: 'total',
    resourceLimits: { food: 8000, wood: 8000, gold: 4000, stone: 0 },
    totalResourceLimit: 20000,
    populationCap: 200,
    selectedAge: 'imperial',
    selectedCiv: 'generic', // The applied civilization (affects calculations)
    previewCiv: 'generic', // The civilization being previewed in the dropdown
    displayMode: 'units', // Display mode: 'units', 'both', or 'fortifications'
    showTechPanel: false, // Whether to show the technology panel (default hidden)
    showUnitCardStats: false, // Whether to show combat stats on individual unit cards (default hidden)
  },
  savedCompositions: [],
  comparisonMode: false,
  comparisonArmies: { a: {}, b: {} },
};

// Action types
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
  // Import composition
  IMPORT_COMPOSITION: 'IMPORT_COMPOSITION',
  // Technology management
  RESEARCH_TECH: 'RESEARCH_TECH',
  UNRESEARCH_TECH: 'UNRESEARCH_TECH',
  SET_RESEARCHED_TECHS: 'SET_RESEARCHED_TECHS',
  RESET_TECHS: 'RESET_TECHS',
  // Undo/Redo actions
  UNDO: 'UNDO',
  REDO: 'REDO',
  // Deprecated - kept for backwards compatibility
  TOGGLE_FORTIFICATION_MODE: 'TOGGLE_FORTIFICATION_MODE',
};

// Actions that should NOT be added to undo history
const NON_UNDOABLE_ACTIONS = new Set([
  ACTION_TYPES.UNDO,
  ACTION_TYPES.REDO,
  ACTION_TYPES.SET_SAVED_COMPOSITIONS,
  ACTION_TYPES.TOGGLE_COMPARISON_MODE,
  ACTION_TYPES.UPDATE_COMPARISON_ARMY,
]);

// Maximum number of undo history entries
const MAX_HISTORY_SIZE = 50;

// Reducer function
function armyReducer(state, action) {
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
      const num = parseInt(action.quantity) || 0;
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
      const num = parseInt(action.quantity) || 0;
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
      // Backwards compatibility: toggle between units and fortifications
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
        config: action.config || state.config,
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
        return state; // Already researched
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

      // Handle merge vs replace mode
      let newComposition;
      if (mode === 'merge') {
        // Merge compositions - add quantities for matching units
        newComposition = { ...state.composition };
        Object.entries(importedComposition).forEach(([unitId, quantity]) => {
          newComposition[unitId] = (newComposition[unitId] || 0) + quantity;
        });
      } else {
        // Replace mode - use imported composition directly
        newComposition = importedComposition;
      }

      // Merge config - imported config takes precedence but preserve unset values
      const newConfig = {
        ...state.config,
        ...importedConfig,
        // Always sync previewCiv with selectedCiv
        previewCiv: importedConfig.selectedCiv || importedConfig.previewCiv || state.config.selectedCiv,
      };

      return {
        ...state,
        composition: newComposition,
        config: newConfig,
      };
    }

    default:
      logger.warn(`Unknown action type: ${action.type}`);
      return state;
  }
}

/**
 * Army Context Provider with Undo/Redo support
 */
export function ArmyProvider({ children }) {
  const [state, baseDispatch] = useReducer(armyReducer, initialState);

  // History management
  const historyRef = useRef([initialState]);
  const historyIndexRef = useRef(0);

  // Wrap dispatch with history tracking
  const dispatch = useCallback(
    (action) => {
      if (action.type === ACTION_TYPES.UNDO) {
        if (historyIndexRef.current > 0) {
          historyIndexRef.current--;
          const previousState = historyRef.current[historyIndexRef.current];
          // Restore the previous state directly
          baseDispatch({
            type: ACTION_TYPES.LOAD_COMPOSITION,
            composition: previousState.composition,
            config: previousState.config,
          });
          // Also restore fortifications and techs
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
          // Restore the next state directly
          baseDispatch({
            type: ACTION_TYPES.LOAD_COMPOSITION,
            composition: nextState.composition,
            config: nextState.config,
          });
          // Also restore fortifications and techs
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

      // Execute the action
      baseDispatch(action);
    },
    [baseDispatch]
  );

  // Update history after state changes (for undoable actions)
  const lastActionRef = useRef(null);
  const updateHistory = useCallback(
    (newState) => {
      // Only add to history if the state actually changed
      const currentHistoryState = historyRef.current[historyIndexRef.current];
      const hasChanged =
        JSON.stringify(newState.composition) !== JSON.stringify(currentHistoryState.composition) ||
        JSON.stringify(newState.config) !== JSON.stringify(currentHistoryState.config) ||
        JSON.stringify(newState.researchedTechs) !==
          JSON.stringify(currentHistoryState.researchedTechs);

      if (hasChanged) {
        // Clear any redo history
        historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);

        // Add new state to history
        historyRef.current.push({
          composition: { ...newState.composition },
          config: { ...newState.config },
          researchedTechs: [...newState.researchedTechs],
        });

        // Trim history if it exceeds max size
        if (historyRef.current.length > MAX_HISTORY_SIZE) {
          historyRef.current = historyRef.current.slice(-MAX_HISTORY_SIZE);
        }

        historyIndexRef.current = historyRef.current.length - 1;

        logger.debug('History updated', {
          index: historyIndexRef.current,
          historyLength: historyRef.current.length,
        });
      }
    },
    []
  );

  // Track state changes for history
  useEffect(() => {
    updateHistory(state);
  }, [state, updateHistory]);

  // Log state changes in development
  useEffect(() => {
    logger.debug('Army state updated', state);
  }, [state]);

  // Provide undo/redo capabilities
  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  const contextValue = {
    state,
    dispatch,
    canUndo,
    canRedo,
    historyLength: historyRef.current.length,
    historyIndex: historyIndexRef.current,
  };

  return <ArmyContext.Provider value={contextValue}>{children}</ArmyContext.Provider>;
}

ArmyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to use Army context
 */
export const useArmy = () => {
  const context = useContext(ArmyContext);
  if (!context) {
    throw new Error('useArmy must be used within ArmyProvider');
  }
  return context;
};
