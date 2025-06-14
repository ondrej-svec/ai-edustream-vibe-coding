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

const RoasterGeographicFilter: React.FC<RoasterGeographicFilterProps> = ({
  roasterContinent,
  roasterCountry,
  onContinentChange,
  onCountryChange,
  allCountries,
}) => {
  const continentOptions = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ] as RoasterContinent[];

  // Show all countries regardless of continent
  const countryOptions = allCountries;

  return (
    <div className="flex gap-4 items-end">
      {/* Continent Select */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Roaster Continent</label>
        <select
          value={roasterContinent || ALL_CONTINENTS_VALUE}
          onChange={(e) =>
            onContinentChange(e.target.value === ALL_CONTINENTS_VALUE ? undefined : (e.target.value as RoasterContinent))
          }
          className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={ALL_CONTINENTS_VALUE}>{ALL_CONTINENTS}</option>
          {continentOptions.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>
      {/* Country Select */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Roaster Country</label>
        <select
          value={roasterCountry || ALL_COUNTRIES_VALUE}
          onChange={(e) =>
            onCountryChange(e.target.value === ALL_COUNTRIES_VALUE ? undefined : (e.target.value as RoasterCountry))
          }
          className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={ALL_COUNTRIES_VALUE}>{ALL_COUNTRIES}</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RoasterGeographicFilter; 