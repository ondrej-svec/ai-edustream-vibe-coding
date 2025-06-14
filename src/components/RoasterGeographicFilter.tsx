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
    <div className="space-y-4 sm:space-y-6">
      <p className="text-sm text-gray-500">
        Optional: Filter by roaster location to support local businesses or find specific regional styles.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Continent Selection */}
        <div>
          <label htmlFor="continent-select" className="block text-sm font-medium text-gray-700 mb-2">
            Continent
          </label>
          <select
            id="continent-select"
            value={roasterContinent || ALL_CONTINENTS_VALUE}
            onChange={handleContinentChange}
            className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value={ALL_CONTINENTS_VALUE}>{ALL_CONTINENTS}</option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        {/* Country Selection */}
        <div>
          <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            id="country-select"
            value={roasterCountry || ALL_COUNTRIES_VALUE}
            onChange={handleCountryChange}
            disabled={!roasterContinent}
            className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value={ALL_COUNTRIES_VALUE}>{ALL_COUNTRIES}</option>
            {filteredCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {!roasterContinent && (
            <p className="text-xs text-gray-400 mt-1">
              Select a continent first to choose a country
            </p>
          )}
        </div>
      </div>

      {/* Selection Summary */}
      {(roasterContinent || roasterCountry) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Filtering by:</span>{" "}
            {roasterContinent && !roasterCountry && `${roasterContinent} roasters`}
            {roasterCountry && `${roasterCountry} roasters`}
          </p>
        </div>
      )}
    </div>
  );
};

export default RoasterGeographicFilter; 