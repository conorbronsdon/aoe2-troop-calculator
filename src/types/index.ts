// Core type definitions for AoE2 Army Calculator

// =============================================================================
// Resource Types
// =============================================================================

export interface ResourceCost {
  food: number;
  wood: number;
  gold: number;
  stone: number;
}

export type ResourceType = keyof ResourceCost;

export interface ResourceLimits {
  food: number;
  wood: number;
  gold: number;
  stone: number;
}

// =============================================================================
// Age Types
// =============================================================================

export type Age = 'dark' | 'feudal' | 'castle' | 'imperial';

export type AgeOrder = Record<Age, number>;

export interface AgeBonus {
  dark?: number;
  feudal?: number;
  castle?: number;
  imperial?: number;
}

// =============================================================================
// Unit Types
// =============================================================================

export type UnitCategory =
  | 'Infantry'
  | 'Cavalry'
  | 'Archer'
  | 'Siege'
  | 'Naval'
  | 'Monk'
  | 'Unique'
  | 'Other';

export interface Unit {
  id: string;
  name: string;
  category: UnitCategory;
  age: Age;
  cost: ResourceCost;
  population: number;
  counters: string[];
  weakTo: string[];
  civilization?: string;
}

export interface UnitWithQuantity extends Unit {
  quantity: number;
}

export interface SelectedUnit {
  unit: Unit;
  quantity: number;
}

// =============================================================================
// Fortification Types
// =============================================================================

export type FortificationCategory = 'Walls' | 'Towers' | 'Castles';

export interface Fortification {
  id: string;
  name: string;
  category: FortificationCategory;
  age: Age;
  cost: ResourceCost;
  population: number;
  description: string;
  hp: number;
  attack?: number;
  range?: number;
  civilization?: string;
}

export interface SelectedFortification {
  fortification: Fortification;
  quantity: number;
}

// =============================================================================
// Civilization Types
// =============================================================================

export type BonusType = 'cost' | 'stat' | 'economic';

export interface CostBonus {
  type: 'cost';
  units: string[];
  resource: string;
  ages?: AgeBonus;
  value?: number;
  description: string;
}

export interface StatBonus {
  type: 'stat';
  units: string | string[];
  stat: string;
  value: number | string;
  description: string;
}

export interface EconomicBonus {
  type: 'economic';
  description: string;
}

export type CivilizationBonus = CostBonus | StatBonus | EconomicBonus;

export interface TeamBonus {
  type: string;
  units?: string[];
  resource?: string;
  ages?: AgeBonus;
  value?: number;
  description: string;
}

export interface Civilization {
  id: string;
  name: string;
  region: string;
  bonuses: CivilizationBonus[];
  teamBonus?: TeamBonus;
}

// =============================================================================
// Technology Types
// =============================================================================

export interface Technology {
  id: string;
  name: string;
  age: Age;
  cost: ResourceCost;
  description: string;
  effects?: TechnologyEffect[];
}

export interface TechnologyEffect {
  type: string;
  units?: string[];
  stat?: string;
  value?: number | string;
}

// =============================================================================
// Army Composition Types
// =============================================================================

export interface ArmyComposition {
  id: string;
  name: string;
  units: Record<string, number>;
  fortifications: Record<string, number>;
  civilization: string;
  age: Age;
  resourceLimitMode: ResourceLimitMode;
  resourceLimits: ResourceLimits;
  totalResourceLimit: number;
  populationCap: number;
  createdAt: string;
  updatedAt: string;
}

export type ResourceLimitMode = 'total' | 'individual';

export type DisplayMode = 'units' | 'fortifications' | 'both';

// =============================================================================
// Configuration Types
// =============================================================================

export interface AppConfiguration {
  resourceLimitMode: ResourceLimitMode;
  resourceLimits: ResourceLimits;
  totalResourceLimit: number;
  populationCap: number;
  selectedAge: Age;
  selectedCiv: string;
  previewCiv: string;
  displayMode: DisplayMode;
}

// =============================================================================
// Preset Types
// =============================================================================

export interface Preset {
  id: string;
  name: string;
  description: string;
  units: Record<string, number>;
  fortifications?: Record<string, number>;
  recommendedCiv?: string;
  tags?: string[];
}

// =============================================================================
// Import/Export Types
// =============================================================================

export type ExportFormat = 'csv' | 'json' | 'text';

export type ImportSource = 'file' | 'paste' | 'url';

export type ImportMode = 'replace' | 'merge';

export interface ImportResult {
  success: boolean;
  compositions: ArmyComposition[];
  errors?: string[];
  warnings?: string[];
}

export interface ImportHistoryEntry {
  id: string;
  timestamp: string;
  source: ImportSource;
  fileName?: string;
  count: number;
  success: boolean;
}

// =============================================================================
// Combat Analysis Types
// =============================================================================

export interface CombatStats {
  totalHP: number;
  totalDamage: number;
  averageArmor: number;
  averagePierceArmor: number;
  populationUsed: number;
  totalCost: ResourceCost;
}

export interface CounterAnalysis {
  strongAgainst: string[];
  weakAgainst: string[];
  recommendations: string[];
}

// =============================================================================
// Toast/Notification Types
// =============================================================================

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// =============================================================================
// Theme Types
// =============================================================================

export type Theme = 'light' | 'dark';

// =============================================================================
// Analytics Types
// =============================================================================

export type AnalyticsCategory = 'composition' | 'export' | 'share' | 'configuration';

export interface AnalyticsEvent {
  category: AnalyticsCategory;
  action: string;
  label?: string;
  value?: number;
}

// =============================================================================
// Storage Types
// =============================================================================

export interface StorageKeys {
  ARMY_COMPOSITIONS: string;
  THEME: string;
  IMPORT_HISTORY: string;
}

// =============================================================================
// Utility Types
// =============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
