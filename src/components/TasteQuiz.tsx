
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { TastePreferences } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface TasteQuizProps {
  onSubmit: (preferences: TastePreferences) => void;
  onReset: () => void;
}

const TasteQuiz = ({ onSubmit, onReset }: TasteQuizProps) => {
  const { toast } = useToast();
  const [roastLevel, setRoastLevel] = useState("");
  const [flavors, setFlavors] = useState<string[]>([]);
  const [brewingMethod, setBrewingMethod] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState([15, 25]);
  const [milkPreference, setMilkPreference] = useState("");

  const flavorOptions = [
    { name: "Fruity", description: "Bright, fresh fruit notes like berries, stone fruits, or citrus" },
    { name: "Nutty", description: "Rich, warm notes of almonds, hazelnuts, or walnuts" },
    { name: "Chocolatey", description: "Deep cocoa, dark chocolate, or milk chocolate flavors" },
    { name: "Earthy", description: "Grounded, soil-like notes with forest floor characteristics" },
    { name: "Bright", description: "Vibrant acidity with lively, sparkling characteristics" },
    { name: "Wild", description: "Unique, unconventional flavors that are bold and adventurous" },
    { name: "Caramel", description: "Sweet, buttery caramel and toffee-like flavors" },
    { name: "Floral", description: "Delicate flower notes like jasmine, lavender, or rose" },
    { name: "Citrusy", description: "Zesty lemon, orange, or grapefruit characteristics" },
    { name: "Berry-like", description: "Specific berry flavors like blueberry, raspberry, or blackberry" },
    { name: "Vanilla", description: "Sweet, creamy vanilla bean and custard-like notes" },
    { name: "Spicy", description: "Warm spices like cinnamon, clove, or black pepper" },
    { name: "Smoky", description: "Rich, roasted flavors with hints of smoke and char" },
    { name: "Honey", description: "Natural sweetness with floral honey characteristics" },
    { name: "Wine-like", description: "Complex, fermented notes similar to red or white wine" },
    { name: "Tropical", description: "Exotic fruit flavors like mango, pineapple, or coconut" },
    { name: "Creamy", description: "Smooth, rich mouthfeel with buttery texture" },
    { name: "Bold", description: "Strong, intense flavors with powerful presence" }
  ];

  const brewingMethods = [
    { name: "V60", description: "Pour-over method that highlights bright, clean flavors and acidity" },
    { name: "Aeropress", description: "Versatile brewing method producing clean, full-bodied coffee" },
    { name: "Espresso", description: "Concentrated coffee with rich crema, perfect for milk drinks" },
    { name: "Moka", description: "Stovetop brewing creating strong, concentrated coffee with bold flavors" },
    { name: "French Press", description: "Full immersion brewing for rich, heavy-bodied coffee with oils" },
    { name: "Chemex", description: "Clean, bright cup with paper filter removing oils and sediment" },
    { name: "Cold Brew", description: "Smooth, low-acid coffee brewed with cold water over time" },
    { name: "Turkish", description: "Traditional method creating thick, strong coffee with fine grounds" }
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

  // Check if all required fields are filled
  const isFormValid = flavors.length > 0 && milkPreference !== "";

  const handleSubmit = () => {
    if (!isFormValid) {
      toast({
        title: "Please complete required fields",
        description: "We need your flavor preferences and milk preference to find the perfect match!",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      roastLevel,
      flavors,
      brewingMethod: brewingMethod.join(", "),
      budget: `$${budgetRange[0]}-${budgetRange[1]} per bag`,
      milkPreference
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
    setBudgetRange([15, 25]);
    setMilkPreference("");
    onReset();
  };

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
                max={50}
                min={10}
                step={5}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>$10</span>
              <span className="font-medium text-gray-900">
                ${budgetRange[0]} - ${budgetRange[1]} per bag
              </span>
              <span>$50+</span>
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
