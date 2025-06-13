import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [budget, setBudget] = useState("");
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

  const budgetOptions = [
    "$10-15 per bag", "$15-25 per bag", "$25-35 per bag", "$35+ per bag"
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

  const handleSubmit = () => {
    if (flavors.length === 0 || !budget || !milkPreference) {
      toast({
        title: "Please complete required fields",
        description: "We need your flavor preferences, budget, and milk preference to find the perfect match!",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      roastLevel,
      flavors,
      brewingMethod: brewingMethod.join(", "),
      budget,
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
    setBudget("");
    setMilkPreference("");
    onReset();
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-lg">
        <CardTitle className="text-2xl text-amber-900 text-center">
          ☕ Taste Quiz
        </CardTitle>
        <p className="text-amber-700 text-center">
          Tell us how you like your coffee to taste
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {/* Flavors */}
        <div>
          <Label className="text-lg font-semibold text-amber-900 mb-4 block">
            What flavors do you enjoy? (Select all that apply) *
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {flavorOptions.map((flavor) => (
              <HoverCard key={flavor.name}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer border border-amber-100">
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
                <HoverCardContent className="w-80 bg-white border-amber-200">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-amber-900">{flavor.name}</h4>
                    <p className="text-sm text-amber-700">{flavor.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* Milk Preference */}
        <div>
          <Label className="text-lg font-semibold text-amber-900 mb-4 block">
            How do you prefer to drink your coffee? *
          </Label>
          <RadioGroup value={milkPreference} onValueChange={setMilkPreference}>
            {milkOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-amber-50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Roast Preference (Optional) */}
        <div>
          <Label className="text-lg font-semibold text-amber-900 mb-4 block">
            Any roast preference? (Optional)
          </Label>
          <p className="text-sm text-amber-600 mb-3">We can recommend based on your taste preferences, but let us know if you have a preference:</p>
          <RadioGroup value={roastLevel} onValueChange={setRoastLevel}>
            <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-amber-50 transition-colors">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex-1 cursor-pointer">
                <span className="font-medium">Light Roast</span>
                <p className="text-sm text-amber-600">Bright, acidic, complex flavors</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-amber-50 transition-colors">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="flex-1 cursor-pointer">
                <span className="font-medium">Medium Roast</span>
                <p className="text-sm text-amber-600">Balanced, smooth, approachable</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-amber-50 transition-colors">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex-1 cursor-pointer">
                <span className="font-medium">Dark Roast</span>
                <p className="text-sm text-amber-600">Bold, rich, full-bodied</p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Brewing Method (Optional, Multi-select) */}
        <div>
          <Label className="text-lg font-semibold text-amber-900 mb-4 block">
            What brewing methods do you use? (Optional)
          </Label>
          <p className="text-sm text-amber-600 mb-3">Select any methods you use or are interested in trying. Hover for details:</p>
          <div className="grid grid-cols-2 gap-3">
            {brewingMethods.map((method) => (
              <HoverCard key={method.name}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer border border-amber-100">
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
                <HoverCardContent className="w-80 bg-white border-amber-200">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-amber-900">{method.name}</h4>
                    <p className="text-sm text-amber-700">{method.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <Label className="text-lg font-semibold text-amber-900 mb-4 block">
            What's your budget range? *
          </Label>
          <RadioGroup value={budget} onValueChange={setBudget}>
            {budgetOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-amber-50 transition-colors">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="cursor-pointer font-medium">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button 
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            Find My Beans ✨
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="px-6 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasteQuiz;
