import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TastePreferences, RoasterContinent, RoasterCountry } from "@/types/coffee";
import RoasterGeographicFilter from "./RoasterGeographicFilter";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TasteQuizProps {
  onSubmit: (preferences: TastePreferences) => void;
  onReset?: () => void;
}

const TasteQuiz = ({ onSubmit, onReset }: TasteQuizProps) => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedRoastLevel, setSelectedRoastLevel] = useState<string>("");
  const [selectedBrewMethod, setSelectedBrewMethod] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [milkPreference, setMilkPreference] = useState<string>("");
  const [roasterContinent, setRoasterContinent] = useState<RoasterContinent | undefined>();
  const [roasterCountry, setRoasterCountry] = useState<RoasterCountry | undefined>();
  const [isOptionalSectionsOpen, setIsOptionalSectionsOpen] = useState(false);

  // Mock countries data - in real app this would come from props or API
  const allCountries = ["United States", "Italy", "Ethiopia", "Colombia", "Brazil"];

  const flavorOptions = [
    { id: "bright", label: "Bright", description: "Vibrant acidity, lively and crisp with citrus-like qualities" },
    { id: "fruity", label: "Fruity", description: "Berry, stone fruit, tropical fruit flavors" },
    { id: "citrusy", label: "Citrusy", description: "Lemon, lime, orange, grapefruit notes" },
    { id: "nutty", label: "Nutty", description: "Almond, hazelnut, walnut, pecan undertones" },
    { id: "chocolatey", label: "Chocolatey", description: "Rich cocoa, dark chocolate, milk chocolate notes" },
    { id: "floral", label: "Floral", description: "Jasmine, lavender, rose, tea-like aromatics" },
    { id: "spicy", label: "Spicy", description: "Cinnamon, clove, cardamom, pepper spice notes" },
    { id: "earthy", label: "Earthy", description: "Soil, mushroom, herb, tobacco-like characteristics" },
    { id: "sweet", label: "Sweet", description: "Caramel, honey, vanilla, brown sugar sweetness" },
    { id: "winey", label: "Winey", description: "Grape, red wine, port-like fermented flavors" },
    { id: "smoky", label: "Smoky", description: "Roasted, charred, BBQ, campfire smoke flavors" },
    { id: "smooth", label: "Smooth", description: "Balanced, mellow, easy-drinking with no harsh notes" }
  ];

  const roastOptions = [
    { id: "light", label: "Light Roast", description: "Bright, acidic, tea-like" },
    { id: "medium", label: "Medium Roast", description: "Balanced, smooth, caramelized" },
    { id: "dark", label: "Dark Roast", description: "Bold, smoky, robust" }
  ];

  const brewingMethods = [
    { id: "pour-over", label: "Pour Over", description: "V60, Chemex, clean and bright extraction" },
    { id: "french-press", label: "French Press", description: "Full immersion, rich and full-bodied" },
    { id: "espresso", label: "Espresso", description: "Concentrated shot, intense and syrupy" },
    { id: "aeropress", label: "AeroPress", description: "Pressure brewing, clean and versatile" },
    { id: "cold-brew", label: "Cold Brew", description: "Long extraction, smooth and less acidic" },
    { id: "drip", label: "Drip Coffee", description: "Automatic brewing, consistent and convenient" }
  ];

  const budgetOptions = [
    { id: "budget", label: "$10-15 per bag", description: "Good quality, affordable options" },
    { id: "mid-range", label: "$15-25 per bag", description: "Premium quality, great value" },
    { id: "premium", label: "$25+ per bag", description: "Specialty, artisan roasters" }
  ];

  const milkOptions = [
    { id: "black", label: "Black Coffee", description: "No milk or cream" },
    { id: "dairy", label: "With Dairy", description: "Regular milk or cream" },
    { id: "alternative", label: "Alt Milk", description: "Oat, almond, soy milk" }
  ];

  const handleFlavorChange = (flavorId: string, checked: boolean) => {
    if (checked) {
      setSelectedFlavors([...selectedFlavors, flavorId]);
    } else {
      setSelectedFlavors(selectedFlavors.filter(id => id !== flavorId));
    }
  };

  const handleSubmit = () => {
    const preferences: TastePreferences = {
      roastLevel: selectedRoastLevel,
      flavors: selectedFlavors,
      brewingMethod: selectedBrewMethod,
      budget: budget,
      milkPreference: milkPreference,
      roasterContinent: roasterContinent,
      roasterCountry: roasterCountry
    };
    onSubmit(preferences);
  };

  // Updated validation - only flavors and budget are required
  const isFormValid = selectedFlavors.length > 0 && budget;

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 py-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Coffee Taste Profile</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Tell us your preferences to find your perfect match
        </p>
      </div>

      {/* Required Sections */}
      {/* Flavor Preferences */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            What flavors do you enjoy? <span className="text-destructive">*</span>
          </CardTitle>
          <CardDescription>
            Select 1-5 flavors that appeal to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flavorOptions.map((flavor) => (
              <label
                key={flavor.id}
                className={`
                  flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border
                  ${selectedFlavors.includes(flavor.id) 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-card border-border hover:bg-muted/50'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={selectedFlavors.includes(flavor.id)}
                  onChange={(e) => handleFlavorChange(flavor.id, e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-2 text-primary focus-ring"
                />
                <div className="flex-1 space-y-1">
                  <div className="font-medium text-foreground">{flavor.label}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{flavor.description}</div>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            Budget <span className="text-destructive">*</span>
          </CardTitle>
          <CardDescription>
            What's your typical spending range for coffee?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetOptions.map((option) => (
              <label
                key={option.id}
                className={`
                  flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border
                  ${budget === option.id 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-card border-border hover:bg-muted/50'
                  }
                `}
              >
                <input
                  type="radio"
                  name="budget"
                  value={option.id}
                  checked={budget === option.id}
                  onChange={(e) => setBudget(e.target.value)}
                  className="mt-1 h-4 w-4 text-primary focus-ring"
                />
                <div className="flex-1 space-y-1">
                  <div className="font-medium text-foreground">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optional Sections - Collapsible */}
      <Card className="card-hover">
        <CardHeader>
          <button
            onClick={() => setIsOptionalSectionsOpen(!isOptionalSectionsOpen)}
            className="w-full flex items-center justify-between text-left focus-ring rounded-lg p-2 -m-2"
            type="button"
          >
            <div>
              <CardTitle className="text-xl">Optional Preferences</CardTitle>
              <CardDescription className="mt-1">
                Fine-tune your recommendations with additional preferences
              </CardDescription>
            </div>
            {isOptionalSectionsOpen ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </CardHeader>

        {isOptionalSectionsOpen && (
          <CardContent className="space-y-8">
            {/* Geographic Preferences */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Geographic Preferences</h3>
                <p className="text-sm text-muted-foreground">Choose roaster location preferences</p>
              </div>
              <RoasterGeographicFilter 
                roasterContinent={roasterContinent}
                roasterCountry={roasterCountry}
                onContinentChange={setRoasterContinent}
                onCountryChange={setRoasterCountry}
                allCountries={allCountries}
              />
            </div>

            {/* Roast Level */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Roast Level</h3>
                <p className="text-sm text-muted-foreground">Choose your preferred roast level</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roastOptions.map((roast) => (
                  <label
                    key={roast.id}
                    className={`
                      flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border
                      ${selectedRoastLevel === roast.id 
                        ? 'bg-primary/10 border-primary' 
                        : 'bg-card border-border hover:bg-muted/50'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="roast"
                      value={roast.id}
                      checked={selectedRoastLevel === roast.id}
                      onChange={(e) => setSelectedRoastLevel(e.target.value)}
                      className="mt-1 h-4 w-4 text-primary focus-ring"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-foreground">{roast.label}</div>
                      <div className="text-sm text-muted-foreground">{roast.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Brewing Method */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Brewing Method</h3>
                <p className="text-sm text-muted-foreground">How do you usually prepare your coffee?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {brewingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`
                      flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border
                      ${selectedBrewMethod === method.id 
                        ? 'bg-primary/10 border-primary' 
                        : 'bg-card border-border hover:bg-muted/50'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="brewing"
                      value={method.id}
                      checked={selectedBrewMethod === method.id}
                      onChange={(e) => setSelectedBrewMethod(e.target.value)}
                      className="mt-1 h-4 w-4 text-primary focus-ring"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-foreground">{method.label}</div>
                      <div className="text-sm text-muted-foreground">{method.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Milk Preference */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Milk Preference</h3>
                <p className="text-sm text-muted-foreground">How do you like to drink your coffee?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {milkOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`
                      flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border
                      ${milkPreference === option.id 
                        ? 'bg-primary/10 border-primary' 
                        : 'bg-card border-border hover:bg-muted/50'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="milk"
                      value={option.id}
                      checked={milkPreference === option.id}
                      onChange={(e) => setMilkPreference(e.target.value)}
                      className="mt-1 h-4 w-4 text-primary focus-ring"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-foreground">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Submit Section */}
      <div className="flex justify-center space-x-4 pt-8">
        {onReset && (
          <Button 
            variant="outline" 
            size="lg" 
            onClick={onReset}
            className="focus-ring"
          >
            Start Over
          </Button>
        )}
        <Button 
          size="lg" 
          onClick={handleSubmit} 
          disabled={!isFormValid}
          className="px-8 focus-ring"
        >
          Find My Perfect Coffee
        </Button>
      </div>
    </div>
  );
};

export default TasteQuiz;
