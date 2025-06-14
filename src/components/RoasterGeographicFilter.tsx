import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
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
        <Select
          value={roasterContinent || ALL_CONTINENTS_VALUE}
          onValueChange={(val) =>
            onContinentChange(val === ALL_CONTINENTS_VALUE ? undefined : (val as RoasterContinent))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={ALL_CONTINENTS} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_CONTINENTS_VALUE}>{ALL_CONTINENTS}</SelectItem>
            {continentOptions.map((continent) => (
              <SelectItem key={continent} value={continent}>
                {continent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Country Select */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Roaster Country</label>
        <Select
          value={roasterCountry || ALL_COUNTRIES_VALUE}
          onValueChange={(val) =>
            onCountryChange(val === ALL_COUNTRIES_VALUE ? undefined : (val as RoasterCountry))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={ALL_COUNTRIES} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_COUNTRIES_VALUE}>{ALL_COUNTRIES}</SelectItem>
            {countryOptions.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RoasterGeographicFilter; 