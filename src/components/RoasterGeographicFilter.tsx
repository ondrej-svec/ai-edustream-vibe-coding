import React from "react";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
//   SelectLabel,
// } from "@/components/ui/select";
// TODO: Replace Select with a working Select component from shadcn/ui or Magic UI
import { RoasterContinent, RoasterCountry } from "@/types/coffee";

interface RoasterGeographicFilterProps {
  roasterContinent?: RoasterContinent;
  roasterCountry?: RoasterCountry;
  onContinentChange: (continent?: RoasterContinent) => void;
  onCountryChange: (country?: RoasterCountry) => void;
  allCountries: RoasterCountry[];
}

const ALL_CONTINENTS = "All Continents";
const ALL_COUNTRIES = "All Countries";
const ALL_CONTINENTS_VALUE = "__ALL_CONTINENTS__";
const ALL_COUNTRIES_VALUE = "__ALL_COUNTRIES__";

const continents: RoasterContinent[] = [
  "Africa",
  "Asia", 
  "Europe",
  "North America",
  "South America",
  "Oceania"
];

const RoasterGeographicFilter: React.FC<RoasterGeographicFilterProps> = ({
  roasterContinent,
  roasterCountry,
  onContinentChange,
  onCountryChange,
  allCountries,
}) => {
  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === ALL_CONTINENTS_VALUE) {
      onContinentChange(undefined);
    } else {
      onContinentChange(value as RoasterContinent);
    }
    // Reset country when continent changes
    onCountryChange(undefined);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === ALL_COUNTRIES_VALUE) {
      onCountryChange(undefined);
    } else {
      onCountryChange(value as RoasterCountry);
    }
  };

  // Filter countries based on selected continent
  const filteredCountries = roasterContinent 
    ? allCountries.filter(country => {
        // This is a simplified mapping - in a real app, you'd have proper continent-country mapping
        if (roasterContinent === "North America") return country === "United States";
        if (roasterContinent === "Europe") return country === "Italy";
        return false;
      })
    : allCountries;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Optional: Filter by roaster location to support{" "}
        <span className="text-primary font-medium">local businesses</span> or find specific regional styles.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Continent Selection */}
        <div>
          <label htmlFor="continent-select" className="block text-sm font-medium text-foreground mb-2">
            🌍 Continent
          </label>
          <div className="relative">
            <select
              id="continent-select"
              value={roasterContinent || ALL_CONTINENTS_VALUE}
              onChange={handleContinentChange}
              className="w-full h-12 px-3 py-2 border border-input rounded-md bg-background text-foreground focus-ring appearance-none cursor-pointer"
            >
              <option value={ALL_CONTINENTS_VALUE}>{ALL_CONTINENTS}</option>
              {continents.map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
            {/* Custom arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground/50"></div>
            </div>
          </div>
        </div>

        {/* Country Selection */}
        <div>
          <label htmlFor="country-select" className="block text-sm font-medium text-foreground mb-2">
            🏠 Country
          </label>
          <div className="relative">
            <select
              id="country-select"
              value={roasterCountry || ALL_COUNTRIES_VALUE}
              onChange={handleCountryChange}
              disabled={!roasterContinent}
              className="w-full h-12 px-3 py-2 border border-input rounded-md bg-background text-foreground focus-ring disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
            >
              <option value={ALL_COUNTRIES_VALUE}>{ALL_COUNTRIES}</option>
              {filteredCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {/* Custom arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent ${!roasterContinent ? 'border-t-muted-foreground' : 'border-t-foreground/50'}`}></div>
            </div>
          </div>
          {!roasterContinent && (
            <p className="text-xs text-muted-foreground mt-1">
              Select a continent first to choose a country
            </p>
          )}
        </div>
      </div>

      {/* Selection Summary */}
      {(roasterContinent || roasterCountry) && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🎯</span>
            <p className="text-sm text-foreground">
              <span className="font-medium">Filtering by:</span>{" "}
              {roasterContinent && !roasterCountry && `${roasterContinent} roasters`}
              {roasterCountry && `${roasterCountry} roasters`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoasterGeographicFilter; 