// Types generated from BrewMatch API OpenAPI contract

export interface UserPreferences {
  flavor_notes: string[];
  drinking_style: 'black' | 'milk' | 'plant' | 'cream' | 'sweetened' | 'mixed';
  budget_min: number;
  budget_max: number;
  roast_preference?: 'light' | 'medium' | 'dark';
  brew_methods?: string[];
  // Proximity filter fields (roaster location)
  roaster_continent?: import('./coffee').RoasterContinent;
  roaster_country?: import('./coffee').RoasterCountry;
}

export interface CoffeeMatch {
  name: string;
  roaster: string;
  flavorNotes: string[];
  price: number;
  brewMethodFit: string[];
  roastLevel: 'light' | 'medium' | 'dark';
  purchaseLink: string;
}

export interface MatchResponse {
  matches: CoffeeMatch[];
}

export interface ErrorResponse {
  error: string;
  code: number;
} 