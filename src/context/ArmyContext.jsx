import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { logger } from '../utils/errorHandler';

const ArmyContext = createContext();

// Initial state
const initialState = {
  composition: {},
  config: {
    resourceLimitMode: 'total',
    resourceLimits: { food: 8000, wood: 8000, gold: 4000, stone: 0 },
    totalResourceLimit: 20000,
    populationCap: 200,
    selectedAge: 'imperial',
    selectedCiv: 'generic', // The applied civilization (affects calculations)
    previewCiv: 'generic' // The civilization being previewed in the dropdown
  },
  savedCompositions: [],
  comparisonMode: false,
  comparisonArmies: { a: {}, b: {} }
};

// Action types
export const ACTION_TYPES = {
  ADD_UNIT: 'ADD_UNIT',
  REMOVE_UNIT: 'REMOVE_UNIT',
  SET_UNIT_QUANTITY: 'SET_UNIT_QUANTITY',
  RESET_COMPOSITION: 'RESET_COMPOSITION',
  UPDATE_CONFIG: 'UPDATE_CONFIG',
  LOAD_COMPOSITION: 'LOAD_COMPOSITION',
  SET_SAVED_COMPOSITIONS: 'SET_SAVED_COMPOSITIONS',
  TOGGLE_COMPARISON_MODE: 'TOGGLE_COMPARISON_MODE',
  UPDATE_COMPARISON_ARMY: 'UPDATE_COMPARISON_ARMY',
  APPLY_CIVILIZATION: 'APPLY_CIVILIZATION'
};

// Reducer function
function armyReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_UNIT:
      return {
        ...state,
        composition: {
          ...state.composition,
          [action.unitId]: (state.composition[action.unitId] || 0) + 1
        }
      };

    case ACTION_TYPES.REMOVE_UNIT: {
      const newQuantity = Math.max(0, (state.composition[action.unitId] || 0) - 1);
      if (newQuantity === 0) {
        const { [action.unitId]: _, ...rest } = state.composition;
        return { ...state, composition: rest };
      }
      return {
        ...state,
        composition: { ...state.composition, [action.unitId]: newQuantity }
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
        composition: { ...state.composition, [action.unitId]: num }
      };
    }

    case ACTION_TYPES.RESET_COMPOSITION:
      return { ...state, composition: {} };

    case ACTION_TYPES.UPDATE_CONFIG:
      return {
        ...state,
        config: { ...state.config, ...action.config }
      };

    case ACTION_TYPES.LOAD_COMPOSITION:
      return {
        ...state,
        composition: action.composition,
        config: action.config || state.config
      };

    case ACTION_TYPES.SET_SAVED_COMPOSITIONS:
      return {
        ...state,
        savedCompositions: action.compositions
      };

    case ACTION_TYPES.TOGGLE_COMPARISON_MODE:
      return {
        ...state,
        comparisonMode: !state.comparisonMode
      };

    case ACTION_TYPES.UPDATE_COMPARISON_ARMY:
      return {
        ...state,
        comparisonArmies: {
          ...state.comparisonArmies,
          [action.side]: action.composition
        }
      };

    case ACTION_TYPES.APPLY_CIVILIZATION:
      return {
        ...state,
        config: {
          ...state.config,
          selectedCiv: action.civId,
          previewCiv: action.civId
        }
      };

    default:
      logger.warn(`Unknown action type: ${action.type}`);
      return state;
  }
}

/**
 * Army Context Provider
 */
export function ArmyProvider({ children }) {
  const [state, dispatch] = useReducer(armyReducer, initialState);

  // Log state changes in development
  useEffect(() => {
    logger.debug('Army state updated', state);
  }, [state]);

  return (
    <ArmyContext.Provider value={{ state, dispatch }}>
      {children}
    </ArmyContext.Provider>
  );
}

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
