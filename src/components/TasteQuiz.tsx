import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { TastePreferences, RoasterContinent, RoasterCountry } from "@/types/coffee";
import { useToast } from "@/hooks/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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
    { name: "Fruity", description: "Bright, fresh fruit notes like berries, stone fruits, or citrus. These coffees often have a vibrant, juicy character that's reminiscent of biting into fresh fruit." },
    { name: "Nutty", description: "Rich, warm notes of almonds, hazelnuts, or walnuts. These flavors provide a comforting, roasted character with hints of toasted nuts and oils." },
    { name: "Chocolatey", description: "Deep cocoa, dark chocolate, or milk chocolate flavors. Ranges from bitter dark chocolate to sweet milk chocolate, often with creamy undertones." },
    { name: "Earthy", description: "Grounded, soil-like notes with forest floor characteristics. Think of wet earth after rain, mushrooms, or the smell of a forest floor." },
    { name: "Bright", description: "Vibrant acidity with lively, sparkling characteristics. These coffees wake up your palate with crisp, clean notes that cut through richness." },
    { name: "Wild", description: "Unique, unconventional flavors that are bold and adventurous. These coffees have unexpected notes that challenge traditional coffee expectations." },
    { name: "Caramel", description: "Sweet, buttery caramel and toffee-like flavors. Rich, golden sweetness reminiscent of burnt sugar, butterscotch, and smooth caramel candy." },
    { name: "Floral", description: "Delicate flower notes like jasmine, lavender, or rose. Light, aromatic qualities that add elegance and perfume-like characteristics to the cup." },
    { name: "Citrusy", description: "Zesty lemon, orange, or grapefruit characteristics. Bright, tangy notes that provide refreshing acidity and clean, crisp finishes." },
    { name: "Berry-like", description: "Specific berry flavors like blueberry, raspberry, or blackberry. Sweet-tart fruit notes with jammy qualities and natural fruit sweetness." },
    { name: "Vanilla", description: "Sweet, creamy vanilla bean and custard-like notes. Smooth, dessert-like qualities with warm, comforting sweetness and creamy texture." },
    { name: "Spicy", description: "Warm spices like cinnamon, clove, or black pepper. Adds complexity with heating spices that create depth and interesting flavor layers." },
    { name: "Smoky", description: "Rich, roasted flavors with hints of smoke and char. Deep, intense notes reminiscent of campfire, barbecue, or wood-fired roasting." },
    { name: "Honey", description: "Natural sweetness with floral honey characteristics. Delicate, golden sweetness with subtle floral undertones and syrupy mouthfeel." },
    { name: "Wine-like", description: "Complex, fermented notes similar to red or white wine. Sophisticated acidity and tannins with grape-like or wine barrel characteristics." },
    { name: "Tropical", description: "Exotic fruit flavors like mango, pineapple, or coconut. Bright, sweet, and often juicy notes that transport you to tropical destinations." },
    { name: "Creamy", description: "Smooth, rich mouthfeel with buttery texture. Full-bodied coffees with silky, velvety texture that coats the palate pleasantly." },
    { name: "Bold", description: "Strong, intense flavors with powerful presence. High-impact coffees that make a statement with robust, uncompromising character." }
  ];

  const brewingMethods = [
    { name: "V60", description: "Pour-over method that highlights bright, clean flavors and acidity. Cone-shaped dripper with spiral ridges for even extraction." },
    { name: "Aeropress", description: "Versatile brewing method producing clean, full-bodied coffee. Uses air pressure for quick extraction with minimal bitterness." },
    { name: "Espresso", description: "Concentrated coffee with rich crema, perfect for milk drinks. High-pressure extraction creating intense, syrupy coffee base." },
    { name: "Moka", description: "Stovetop brewing creating strong, concentrated coffee with bold flavors. Italian method producing coffee between espresso and drip." },
    { name: "French Press", description: "Full immersion brewing for rich, heavy-bodied coffee with oils. Metal filter allows oils and fine particles for full flavor." },
    { name: "Chemex", description: "Clean, bright cup with paper filter removing oils and sediment. Thick filter creates exceptionally clean, tea-like coffee." },
    { name: "Cold Brew", description: "Smooth, low-acid coffee brewed with cold water over time. Extended steeping creates naturally sweet, smooth concentrate." },
    { name: "Turkish", description: "Traditional method creating thick, strong coffee with fine grounds. Unfiltered brewing with coffee grounds remaining in cup." },
    { name: "Pulsar", description: "Hybrid brewing method combining immersion and percolation. Unique dripper design for controlled water flow and even extraction." },
    { name: "Hario Switch", description: "Immersion-dripper hybrid allowing control over brew time. Switch mechanism lets you control when coffee starts dripping." }
  ];

  const milkOptions = [
    { value: "black", label: "Black coffee only" },
    { value: "milk", label: "With dairy milk" },
    { value: "plant", label: "With plant-based milk (oat, almond, etc.)" },
    { value: "cream", label: "With cream or half-and-half" },
    { value: "sweetened", label: "With sugar, honey, or syrups" },
    { value: "mixed", label: "I enjoy it both black and with additions" }
  ];

  const handleFlavorToggle = (flavor: string) => {
    setFlavors(prev => 
      prev.includes(flavor) 
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const handleBrewingMethodToggle = (method: string) => {
    setBrewingMethod(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const isFormValid = flavors.length > 0 && milkPreference !== "";

  // Mock coffee data for filtering demonstration
  const baseRecommendations = [
    {
      id: "1",
      name: "Ethiopian Yirgacheffe",
      roaster: "Blue Bottle Coffee",
      roasterCountry: "United States",
      roasterContinent: "North America",
      roastLevel: "Light",
      flavorNotes: ["Fruity", "Bright", "Floral"],
      recommendedBrewMethod: "V60",
      price: "$18",
      buyLink: "https://bluebottlecoffee.com",
      shopName: "Blue Bottle Coffee",
      shopLocation: "Oakland, CA",
      whyPicked: "Your love for bright, fruity flavors makes this Ethiopian single-origin perfect for you.",
    },
    {
      id: "2",
      name: "Guatemala Antigua",
      roaster: "Stumptown Coffee",
      roasterCountry: "United States",
      roasterContinent: "North America",
      roastLevel: "Medium",
      flavorNotes: ["Chocolatey", "Nutty", "Balanced"],
      recommendedBrewMethod: "French Press",
      price: "$16",
      buyLink: "https://stumptowncoffee.com",
      shopName: "Stumptown Coffee Roasters",
      shopLocation: "Portland, OR",
      whyPicked: "This medium roast balances richness with the nutty notes you enjoy.",
    },
    {
      id: "3",
      name: "Colombian Supremo",
      roaster: "Counter Culture",
      roasterCountry: "United States",
      roasterContinent: "North America",
      roastLevel: "Medium",
      flavorNotes: ["Caramel", "Nutty", "Smooth"],
      recommendedBrewMethod: "Aeropress",
      price: "$19",
      buyLink: "https://counterculturecoffee.com",
      shopName: "Counter Culture Coffee",
      shopLocation: "Durham, NC",
      whyPicked: "The caramel sweetness and smooth body align perfectly with your preferences.",
    },
    {
      id: "4",
      name: "Sumatra Mandheling",
      roaster: "Intelligentsia",
      roasterCountry: "United States",
      roasterContinent: "North America",
      roastLevel: "Dark",
      flavorNotes: ["Earthy", "Wild", "Bold"],
      recommendedBrewMethod: "French Press",
      price: "$17",
      buyLink: "https://intelligentsiacoffee.com",
      shopName: "Intelligentsia Coffee",
      shopLocation: "Chicago, IL",
      whyPicked: "For those seeking adventure - this wild, earthy profile will surprise and delight.",
    },
    {
      id: "5",
      name: "Kenya AA",
      roaster: "Ritual Coffee",
      roasterCountry: "United States",
      roasterContinent: "North America",
      roastLevel: "Light",
      flavorNotes: ["Bright", "Berry-like", "Wine-like"],
      recommendedBrewMethod: "Chemex",
      price: "$22",
      buyLink: "https://ritualcoffee.com",
      shopName: "Ritual Coffee Roasters",
      shopLocation: "San Francisco, CA",
      whyPicked: "The bright acidity and complex fruit notes match your sophisticated palate.",
    },
    {
      id: "6",
      name: "Brazilian Cerrado",
      roaster: "Counter Culture",
      roasterCountry: "United States",
      roasterContinent: "North America",
      roastLevel: "Medium",
      flavorNotes: ["Chocolatey", "Nutty", "Creamy"],
      recommendedBrewMethod: "Espresso",
      price: "$20",
      buyLink: "https://counterculturecoffee.com",
      shopName: "Counter Culture Coffee",
      shopLocation: "Durham, NC",
      whyPicked: "Excellent for espresso and milk drinks with chocolate and nut characteristics.",
    }
  ];

  const handleSubmit = () => {
    if (!isFormValid) {
      toast({
        title: ERRORS.REQUIRED_FIELD,
        description: `${ERRORS.FLAVORS_REQUIRED} ${ERRORS.MILK_REQUIRED}`,
        variant: "destructive"
      });
      return;
    }

    // Mock filtering logic for roasterContinent and roasterCountry
    let filteredCoffees = baseRecommendations;
    if (roasterContinent) {
      filteredCoffees = filteredCoffees.filter(c => c.roasterContinent === roasterContinent);
    }
    if (roasterCountry) {
      filteredCoffees = filteredCoffees.filter(c => c.roasterCountry === roasterCountry);
    }

    onSubmit({
      roastLevel,
      flavors,
      brewingMethod: brewingMethod.join(", "),
      budget: `$${budgetRange[0]}-${budgetRange[1]} per bag`,
      milkPreference,
      // Always include proximity fields for API compatibility
      roasterContinent: roasterContinent ?? undefined,
      roasterCountry: roasterCountry ?? undefined,
    });

    toast({
      title: "Perfect! ✨",
      description: "Finding your ideal coffee matches...",
    });
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

  // Dynamically compute allCountries based on selected continent
  const allCountries: string[] = roasterContinent
    ? ROASTER_CONTINENT_COUNTRY_MAP[roasterContinent] || []
    : Array.from(new Set(Object.values(ROASTER_CONTINENT_COUNTRY_MAP).flat()));

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl text-gray-900 text-center font-medium">
          Coffee Taste Profile
        </CardTitle>
        <p className="text-gray-600 text-center text-sm">
          Tell us your preferences to find your perfect match
        </p>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Roaster Proximity Filter */}
        <div>
          <Label className="text-lg font-medium text-gray-900 mb-4 block">
            Prefer roasters in a specific region?
          </Label>
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
        {/* Required Fields */}
        
        {/* Flavors - Required */}
        <div>
          <Label className="text-lg font-medium text-gray-900 mb-4 block">
            What flavors do you enjoy? <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-gray-500 mb-4">Select all that apply. Hover for detailed descriptions.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {flavorOptions.map((flavor) => (
              <HoverCard key={flavor.name}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200">
                    <Checkbox
                      id={flavor.name}
                      checked={flavors.includes(flavor.name)}
                      onCheckedChange={() => handleFlavorToggle(flavor.name)}
                    />
                    <Label htmlFor={flavor.name} className="cursor-pointer font-medium text-sm">
                      {flavor.name}
                    </Label>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white border-gray-200">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">{flavor.name}</h4>
                    <p className="text-sm text-gray-600">{flavor.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* Milk Preference - Required */}
        <div>
          <Label className="text-lg font-medium text-gray-900 mb-4 block">
            How do you prefer to drink your coffee? <span className="text-red-500">*</span>
          </Label>
          <RadioGroup value={milkPreference} onValueChange={setMilkPreference}>
            {milkOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Budget Range - Required */}
        <div>
          <Label className="text-lg font-medium text-gray-900 mb-4 block">
            Budget range per bag <span className="text-red-500">*</span>
          </Label>
          <div className="space-y-4">
            <div className="px-4">
              <Slider
                value={budgetRange}
                onValueChange={setBudgetRange}
                max={VALIDATION.BUDGET_MAX}
                min={VALIDATION.BUDGET_MIN}
                step={VALIDATION.BUDGET_STEP}
                className="w-full"
              />
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
            <Label className="text-base font-medium text-gray-900 mb-4 block">
              Any roast preference?
            </Label>
            <p className="text-sm text-gray-500 mb-4">We can recommend based on your taste preferences, but let us know if you have a preference:</p>
            <RadioGroup value={roastLevel} onValueChange={setRoastLevel}>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex-1 cursor-pointer">
                  <span className="font-medium">Light Roast</span>
                  <p className="text-sm text-gray-500">Bright, acidic, complex flavors</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="flex-1 cursor-pointer">
                  <span className="font-medium">Medium Roast</span>
                  <p className="text-sm text-gray-500">Balanced, smooth, approachable</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex-1 cursor-pointer">
                  <span className="font-medium">Dark Roast</span>
                  <p className="text-sm text-gray-500">Bold, rich, full-bodied</p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Brewing Method - Optional */}
          <div>
            <Label className="text-base font-medium text-gray-900 mb-4 block">
              What brewing methods do you use?
            </Label>
            <p className="text-sm text-gray-500 mb-4">Select any methods you use or are interested in trying. Hover for details:</p>
            <div className="grid grid-cols-2 gap-3">
              {brewingMethods.map((method) => (
                <HoverCard key={method.name}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200">
                      <Checkbox
                        id={method.name}
                        checked={brewingMethod.includes(method.name)}
                        onCheckedChange={() => handleBrewingMethodToggle(method.name)}
                      />
                      <Label htmlFor={method.name} className="cursor-pointer font-medium text-sm">
                        {method.name}
                      </Label>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-white border-gray-200">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900">{method.name}</h4>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
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
      </CardContent>
    </Card>
  );
};

export default TasteQuiz;
