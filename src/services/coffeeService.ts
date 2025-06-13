import { apiGet, apiPost, ApiError, NetworkError, TimeoutError } from '../lib/api';
import { Coffee, CoffeeFilter } from '../types/coffee';
// TODO: Import Coffee types from src/types/coffee (stubbed for now)
// import { Coffee, CoffeeQuery, CoffeeCreateInput, CoffeeUpdateInput } from '../types/coffee';

// Stubs for demonstration
export interface Coffee {
  id: string;
  name: string;
  origin: string;
  roast: string;
  // ...other fields
}

export interface CoffeeQuery {
  search?: string;
  origin?: string;
  roast?: string;
  // ...other filters
}

export interface CoffeeCreateInput {
  name: string;
  origin: string;
  roast: string;
  // ...other fields
}

export interface CoffeeUpdateInput {
  name?: string;
  origin?: string;
  roast?: string;
  // ...other fields
}

function isCoffee(obj: any): obj is Coffee {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}

/**
 * CoffeeService provides CRUD operations and search for coffee data via API.
 */
export class CoffeeService {
  /**
   * Get all coffees, optionally filtered by query params.
   * @throws {ApiError|NetworkError|TimeoutError}
   */
  static async getCoffees(query?: CoffeeFilter): Promise<Coffee[]> {
    try {
      const params = query ? '?' + new URLSearchParams(query as any).toString() : '';
      const data = await apiGet<Coffee[]>(`/coffees${params}`);
      if (!Array.isArray(data) || !data.every(isCoffee)) throw new ApiError('Invalid response shape');
      return data.map(CoffeeService.transformCoffee);
    } catch (err) {
      CoffeeService.handleError(err);
    }
  }

  /**
   * Get a single coffee by ID.
   * @throws {ApiError|NetworkError|TimeoutError}
   */
  static async getCoffeeById(id: string): Promise<Coffee> {
    try {
      const data = await apiGet<Coffee>(`/coffees/${id}`);
      if (!isCoffee(data)) throw new ApiError('Invalid response shape');
      return CoffeeService.transformCoffee(data);
    } catch (err) {
      CoffeeService.handleError(err);
    }
  }

  /**
   * Search coffees by query.
   * @throws {ApiError|NetworkError|TimeoutError}
   */
  static async searchCoffees(query: CoffeeFilter): Promise<Coffee[]> {
    return CoffeeService.getCoffees(query);
  }

  /**
   * Create a new coffee entry.
   * @throws {ApiError|NetworkError|TimeoutError}
   */
  static async createCoffee(input: Partial<Coffee>): Promise<Coffee> {
    try {
      const data = await apiPost<Coffee>('/coffees', input);
      if (!isCoffee(data)) throw new ApiError('Invalid response shape');
      return CoffeeService.transformCoffee(data);
    } catch (err) {
      CoffeeService.handleError(err);
    }
  }

  /**
   * Update an existing coffee entry.
   * @throws {ApiError|NetworkError|TimeoutError}
   */
  static async updateCoffee(id: string, input: Partial<Coffee>): Promise<Coffee> {
    try {
      const data = await apiPost<Coffee>(`/coffees/${id}`, input); // Replace with apiPatch/apiPut if available
      if (!isCoffee(data)) throw new ApiError('Invalid response shape');
      return CoffeeService.transformCoffee(data);
    } catch (err) {
      CoffeeService.handleError(err);
    }
  }

  /**
   * Delete a coffee entry.
   * @throws {ApiError|NetworkError|TimeoutError}
   */
  static async deleteCoffee(id: string): Promise<void> {
    try {
      await apiPost(`/coffees/${id}/delete`, {}); // Replace with apiDelete if available
    } catch (err) {
      CoffeeService.handleError(err);
    }
  }

  /**
   * Transform API response to Coffee type (normalization, field mapping, etc.)
   */
  static transformCoffee(data: any): Coffee {
    // Example transformation (identity for now)
    return data;
  }

  static handleError(err: any): never {
    if (err instanceof ApiError || err instanceof NetworkError || err instanceof TimeoutError) {
      throw err;
    }
    throw new ApiError('Unknown error', undefined, err);
  }
}

// TODO: Add retry logic, error handling, and response validation as described in the task. 