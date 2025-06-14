import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // TODO: Replace with shadcn/ui or Magic UI Card
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // TODO: Replace with shadcn/ui or Magic UI RadioGroup
// import { Label } from "@/components/ui/label"; // TODO: Replace with shadcn/ui or Magic UI Label
// import { Checkbox } from "@/components/ui/checkbox"; // TODO: Replace with shadcn/ui or Magic UI Checkbox
// import { Slider } from "@/components/ui/slider"; // TODO: Replace with shadcn/ui or Magic UI Slider
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"; // TODO: Replace with shadcn/ui or Magic UI HoverCard
import { TastePreferences, RoasterContinent, RoasterCountry } from "@/types/coffee";
import { useToast } from "@/hooks/use-toast";
import { VALIDATION, ERRORS, DEFAULTS, ROASTER_CONTINENT_COUNTRY_MAP } from "@/constants";
import RoasterGeographicFilter from "@/components/RoasterGeographicFilter";

interface TasteQuizProps {
  onSubmit: (preferences: TastePreferences) => void;
  onReset: () => void;
}

const TasteQuiz = ({ onSubmit, onReset }: TasteQuizProps) => {
  const { toast } = useToast();
  const [roastLevel, setRoastLevel] = useState("");
  const [flavors, setFlavors] = useState<string[]>([]);
  const [brewingMethod, setBrewingMethod] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState(DEFAULTS.BUDGET_RANGE);
  const [milkPreference, setMilkPreference] = useState("");
  const [roasterContinent, setRoasterContinent] = useState<RoasterContinent | undefined>(undefined);
  const [roasterCountry, setRoasterCountry] = useState<RoasterCountry | undefined>(undefined);

  const flavorOptions = [
    { name: "Bright", description: "Vibrant acidity, lively and crisp with citrus-like qualities" },
    { name: "Fruity", description: "Berry, stone fruit, tropical fruit flavors" },
    { name: "Citrusy", description: "Lemon, lime, orange, grapefruit notes" },
    { name: "Nutty", description: "Almond, hazelnut, walnut, pecan undertones" },
    { name: "Chocolatey", description: "Rich cocoa, dark chocolate, milk chocolate notes" },
    { name: "Floral", description: "Jasmine, lavender, rose, tea-like aromatics" },
    { name: "Spicy", description: "Cinnamon, clove, cardamom, black pepper warmth" },
    { name: "Earthy", description: "Woody, herbal, mushroom, forest floor qualities" },
    { name: "Sweet", description: "Caramel, vanilla, honey, brown sugar notes" },
    { name: "Smoky", description: "Roasted, charred, barbecue, tobacco-like" },
    { name: "Wine-like", description: "Fermented, grape, red wine, complex fruit notes" },
    { name: "Tropical", description: "Pineapple, mango, coconut, exotic fruit flavors" },
    { name: "Caramelized", description: "Burnt sugar, toffee, molasses, maple syrup" },
    { name: "Herbal", description: "Mint, sage, thyme, green tea, grassy notes" },
    { name: "Buttery", description: "Creamy, rich, smooth, dairy-like mouthfeel" },
    { name: "Tangy", description: "Sharp acidity, tartness, sour fruit qualities" },
  ];

  const brewingMethods = [
    { name: "V60", description: "Pour-over method that highlights bright, clean flavors and acidity. Cone-shaped dripper with spiral ridges for even extraction." },
    { name: "Aeropress", description: "Versatile brewing method producing clean, full-bodied coffee. Uses air pressure for quick extraction with minimal bitterness." },
    { name: "Espresso", description: "Concentrated coffee with rich crema, perfect for milk drinks. High-pressure extraction creating intense, syrupy coffee base." },
    { name: "Moka Pot", description: "Stovetop brewing creating strong, concentrated coffee with bold flavors. Italian method producing coffee between espresso and drip." },
    { name: "French Press", description: "Full immersion brewing for rich, heavy-bodied coffee with oils. Metal filter allows oils and fine particles for full flavor." },
    { name: "Chemex", description: "Clean, bright cup with paper filter removing oils and sediment. Thick filter creates exceptionally clean, tea-like coffee." },
    { name: "Cold Brew", description: "Smooth, low-acid coffee brewed with cold water over time. Extended steeping creates naturally sweet, smooth concentrate." },
    { name: "Turkish Coffee", description: "Traditional method creating thick, strong coffee with fine grounds. Unfiltered brewing with coffee grounds remaining in cup." },
    { name: "Pour Over (General)", description: "Manual brewing method with controlled water pouring over coffee grounds. Allows precise control over extraction time and flavor." },
    { name: "Drip Coffee Maker", description: "Automatic brewing with consistent water temperature and timing. Convenient method for daily coffee with balanced flavor." },
    { name: "Siphon/Vacuum Pot", description: "Theatrical brewing method using vapor pressure and vacuum. Creates clean, bright coffee with unique brewing experience." },
    { name: "Kalita Wave", description: "Flat-bottom pour-over with three holes for even extraction. Produces balanced, consistent cups with forgiving brewing technique." },
    { name: "Clever Dripper", description: "Immersion-dripper hybrid with valve control. Combines full immersion steeping with clean paper filtration." },
    { name: "Hario Switch", description: "Immersion-dripper hybrid allowing control over brew time. Switch mechanism lets you control when coffee starts dripping." },
    { name: "Origami Dripper", description: "Versatile dripper compatible with multiple filter types. Allows experimentation with different brewing styles and filters." },
    { name: "Pulsar", description: "Hybrid brewing method combining immersion and percolation. Unique dripper design for controlled water flow and even extraction." },
    { name: "Nitro Cold Brew", description: "Cold brew infused with nitrogen gas for creamy texture. Creates smooth, cascading coffee with beer-like foam head." },
    { name: "Espresso Machine", description: "Semi-automatic or automatic espresso brewing with precise pressure control. Professional-grade extraction for café-quality drinks." },
    { name: "Percolator", description: "Traditional method cycling boiling water through coffee grounds. Creates strong, bold coffee with vintage brewing charm." },
    { name: "Cowboy Coffee", description: "Simple campfire method boiling coffee grounds directly in water. Rustic brewing technique for outdoor adventures." }
  ];

  const milkOptions = [
    { value: "black", label: "Black coffee only" },
    { value: "splash", label: "Just a splash of milk" },
    { value: "creamy", label: "Creamy with lots of milk" },
    { value: "alternative", label: "Alternative milk (oat, almond, etc.)" },
  ];

  const roastOptions = [
    { value: "light", label: "Light Roast" },
    { value: "medium", label: "Medium Roast" },
    { value: "dark", label: "Dark Roast" },
  ];

  const brewingOptions = [
    { value: "espresso", label: "Espresso" },
    { value: "espresso-machine", label: "Espresso Machine" },
    { value: "pour-over", label: "Pour Over (V60, Chemex, etc.)" },
    { value: "french-press", label: "French Press" },
    { value: "aeropress", label: "Aeropress" },
    { value: "drip-coffee-maker", label: "Drip Coffee Maker" },
    { value: "cold-brew", label: "Cold Brew" },
    { value: "moka-pot", label: "Moka Pot" },
    { value: "turkish-coffee", label: "Turkish Coffee" },
    { value: "siphon", label: "Siphon/Vacuum Pot" },
    { value: "clever-dripper", label: "Clever Dripper" },
    { value: "kalita-wave", label: "Kalita Wave" },
    { value: "chemex", label: "Chemex" },
    { value: "v60", label: "Hario V60" },
    { value: "nitro-cold-brew", label: "Nitro Cold Brew" },
    { value: "percolator", label: "Percolator" },
  ];

  const handleFlavorToggle = (flavor: string) => {
    setFlavors(prev => 
      prev.includes(flavor) 
        ? prev.filter(f => f !== flavor)
        : prev.length < VALIDATION.MAX_FLAVORS 
          ? [...prev, flavor]
          : prev
    );
  };

  const handleBrewingMethodToggle = (method: string) => {
    setBrewingMethod(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleBudgetMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBudgetRange([value, Math.max(value, budgetRange[1])]);
  };

  const handleBudgetMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBudgetRange([Math.min(budgetRange[0], value), value]);
  };

  const isFormValid = flavors.length > 0 && milkPreference !== "";

  const handleSubmit = () => {
    if (!isFormValid) {
      toast({
        title: ERRORS.REQUIRED_FIELD,
        description: `${ERRORS.FLAVORS_REQUIRED} ${ERRORS.MILK_REQUIRED}`,
        variant: "destructive"
      });
      return;
    }

    const preferences: TastePreferences = {
      roastLevel: roastLevel || "any",
      flavors,
      brewingMethod: brewingMethod.join(", "),
      budget: `$${budgetRange[0]}-${budgetRange[1]} per bag`,
      milkPreference,
      roasterContinent,
      roasterCountry
    };

    onSubmit(preferences);
  };

  const handleReset = () => {
    setRoastLevel("");
    setFlavors([]);
    setBrewingMethod([]);
    setBudgetRange(DEFAULTS.BUDGET_RANGE);
    setMilkPreference("");
    setRoasterContinent(undefined);
    setRoasterCountry(undefined);
    onReset();
  };

  // Get all countries for the current continent or all countries if no continent selected
  const allCountries: string[] = roasterContinent
    ? ROASTER_CONTINENT_COUNTRY_MAP[roasterContinent] || []
    : Array.from(new Set(Object.values(ROASTER_CONTINENT_COUNTRY_MAP).flat()));

  return (
    <div className="bg-white border-gray-200 shadow-sm border rounded-lg">
      <div className="bg-gray-50 border-b border-gray-200 p-6">
        <h2 className="text-2xl text-gray-900 text-center font-medium">
          Coffee Taste Profile
        </h2>
        <p className="text-gray-600 text-center text-sm">
          Tell us your preferences to find your perfect match
        </p>
      </div>
      <div className="p-8 space-y-8">
        {/* Roaster Proximity Filter */}
        <div>
          <label className="text-lg font-medium text-gray-900 mb-4 block">
            Prefer roasters in a specific region?
          </label>
          <RoasterGeographicFilter
            roasterContinent={roasterContinent}
            roasterCountry={roasterCountry}
            onContinentChange={(val) => {
              setRoasterContinent(val);
              setRoasterCountry(undefined);
            }}
            onCountryChange={setRoasterCountry}
            allCountries={allCountries}
          />
        </div>
        
        {/* Flavors - Required */}
        <div>
          <label className="text-lg font-medium text-gray-900 mb-4 block">
            What flavors do you enjoy? <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-500 mb-4">Select {VALIDATION.MIN_FLAVORS}-{VALIDATION.MAX_FLAVORS} flavors that appeal to you:</p>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {flavorOptions.map((flavor) => (
              <div key={flavor.name} className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200 min-h-[44px]">
                <input 
                  type="checkbox" 
                  id={flavor.name}
                  checked={flavors.includes(flavor.name)}
                  onChange={() => handleFlavorToggle(flavor.name)}
                  className="w-4 h-4 mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label htmlFor={flavor.name} className="cursor-pointer font-medium text-sm sm:text-base block">
                    {flavor.name}
                  </label>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-tight">
                    {flavor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {flavors.length > 0 && (
            <p className="text-sm text-gray-600 mt-3">
              Selected: {flavors.join(", ")} ({flavors.length}/{VALIDATION.MAX_FLAVORS})
            </p>
          )}
        </div>

        {/* Milk Preference - Required */}
        <div>
          <label className="text-lg font-medium text-gray-900 mb-4 block">
            How do you prefer to drink your coffee? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {milkOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input 
                  type="radio" 
                  value={option.value} 
                  id={option.value}
                  checked={milkPreference === option.value}
                  onChange={(e) => setMilkPreference(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Range - Required */}
        <div>
          <label className="text-lg font-medium text-gray-900 mb-4 block">
            Budget range per bag <span className="text-red-500">*</span>
          </label>
          <div className="space-y-4">
            <div className="px-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Minimum: ${budgetRange[0]}</label>
                <input
                  type="range"
                  min={VALIDATION.BUDGET_MIN}
                  max={VALIDATION.BUDGET_MAX}
                  value={budgetRange[0]}
                  onChange={handleBudgetMinChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Maximum: ${budgetRange[1]}</label>
                <input
                  type="range"
                  min={VALIDATION.BUDGET_MIN}
                  max={VALIDATION.BUDGET_MAX}
                  value={budgetRange[1]}
                  onChange={handleBudgetMaxChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>${VALIDATION.BUDGET_MIN}</span>
              <span className="font-medium text-gray-900">
                ${budgetRange[0]} - ${budgetRange[1]} per bag
              </span>
              <span>${VALIDATION.BUDGET_MAX}+</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Optional Preferences</h3>
          
          {/* Roast Preference - Optional */}
          <div className="mb-8">
            <label className="text-base font-medium text-gray-900 mb-4 block">
              Any roast preference?
            </label>
            <p className="text-sm text-gray-500 mb-4">We can recommend based on your taste preferences, but let us know if you have a preference:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input 
                  type="radio" 
                  value="" 
                  id="no-preference"
                  checked={roastLevel === ""}
                  onChange={(e) => setRoastLevel(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="no-preference" className="flex-1 cursor-pointer">
                  <span className="font-medium">No Preference</span>
                  <p className="text-sm text-gray-500">Let us recommend based on your taste preferences</p>
                </label>
              </div>
              {roastOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    value={option.value} 
                    id={option.value}
                    checked={roastLevel === option.value}
                    onChange={(e) => setRoastLevel(e.target.value)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <span className="font-medium">{option.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brewing Method - Optional */}
          <div>
            <label className="text-base font-medium text-gray-900 mb-4 block">
              Preferred brewing methods?
            </label>
            <p className="text-sm text-gray-500 mb-4">Select all that apply (optional):</p>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {brewingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200 min-h-[44px]">
                  <input 
                    type="checkbox" 
                    id={option.value}
                    checked={brewingMethod.includes(option.value)}
                    onChange={() => handleBrewingMethodToggle(option.value)}
                    className="w-4 h-4 flex-shrink-0"
                  />
                  <label htmlFor={option.value} className="flex-1 cursor-pointer font-medium text-sm sm:text-base">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <Button 
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="flex-1 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            Find My Perfect Beans ✨
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TasteQuiz;
