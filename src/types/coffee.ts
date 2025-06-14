/**
 * Coffee domain types and interfaces
 * Centralized definitions for use across the app
 */

// Geographic types for filtering and data consistency (roaster location)
export type RoasterContinent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Oceania';

export type RoasterCountry = string; // Consider stricter typing if needed

// Core coffee entity
export interface Coffee {
  id: string;
  name: string;
  roaster: string;
  roasterCountry: RoasterCountry; // Roaster's country
  roasterContinent: RoasterContinent; // Roaster's continent
  roastLevel: string;
  flavorNotes: string[];
  recommendedBrewMethod?: string;
  recipe?: Recipe;
  price?: string;
  buyLink?: string;
  shopName?: string;
  shopLocation?: string;
  whyPicked?: string;
  image?: string;
}

export interface Recipe {
  grindSize: string;
  coffeeRatio: string;
  waterTemp: string;
  brewTime: string;
  steps: string[];
}

export interface CoffeeFilter {
  flavors?: string[];
  roastLevel?: string;
  budget?: string;
  milkPreference?: string;
  brewingMethod?: string;
  roasterContinent?: RoasterContinent; // Roaster's continent filter
  roasterCountry?: RoasterCountry;     // Roaster's country filter
}

// API response wrappers
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: ApiError;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  code: string | number;
  message: string;
  details?: string;
}

// UI state and form types
export interface LoadingState {
  loading: boolean;
  error?: string | null;
}

export interface TastePreferences {
  roastLevel: string;
  flavors: string[];
  brewingMethod: string;
  budget: string;
  milkPreference?: string;
  roasterContinent?: RoasterContinent;
  roasterCountry?: RoasterCountry;
} 