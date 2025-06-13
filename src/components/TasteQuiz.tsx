
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TastePreferences } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";

interface TasteQuizProps {
  onSubmit: (preferences: TastePreferences) => void;
  onReset: () => void;
}

const TasteQuiz = ({ onSubmit, onReset }: TasteQuizProps) => {
  const { toast } = useToast();
  const [roastLevel, setRoastLevel] = useState("");
  const [flavors, setFlavors] = useState<string[]>([]);
  const [brewingMethod, setBrewingMethod] = useState("");
  const [budget, setBudget] = useState("");

  const flavorOptions = [
    "Fruity", "Nutty", "Chocolatey", "Earthy", "Bright", "Wild", "Caramel"
  ];

  const brewingMethods = [
    "V60", "Aeropress", "Espresso", "Moka", "French Press", "Chemex"
  ];

  const budgetOptions = [
    "$10-15 per bag", "$15-25 per bag", "$25-35 per bag", "$35+ per bag"
  ];

  const handleFlavorToggle = (flavor: string) => {
    setFlavors(prev => 
      prev.includes(flavor) 
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const handleSubmit = () => {
    if (!roastLevel || flavors.length === 0 || !brewingMethod || !budget) {
      toast({
        title: "Please complete all fields",
        description: "We need all your preferences to find the perfect coffee match!",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      roastLevel,
      flavors,
      brewingMethod,
      budget
    });

    toast({
      title: "Perfect! ✨",
      description: "Finding your ideal coffee matches...",
    });
  };

  const handleReset = () => {
    setRoastLevel("");
    setFlavors([]);
    setBrewingMethod("");
    setBudget("");
    onReset();
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-lg">
        <CardTitle className="text-2xl text-amber-900 text-center">
          ☕ Taste Quiz
        </CardTitle>
        <p className="text-amber-700 text-center">
          Tell us about your coffee preferences
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {/* Roast Level */}
        <div>
          <Label className="text-lg font-semibold text-amber-900 mb-4 block">
            What roast level do you prefer?
          </Label>
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

        {/* Flavors */}
        <div>
          <Label className="text-lg font-semibold text-amber-900 mb-4 block">
            What flavors do you enjoy? (Select all that apply)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {flavorOptions.map((flavor) => (
              <div key={flavor} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-amber-50 transition-colors">
                <Checkbox
                  id={flavor}
                  checked={flavors.includes(flavor)}
                  onCheckedChange={() => handleFlavorToggle(flavor)}
                />
                <Label htmlFor={flavor} className="cursor-pointer font-medium">
                  {flavor}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Brewing Method */}
        <div>
          <Label className="text-lg font-semibold text-amber-900 mb-4 block">
            What's your preferred brewing method?
          </Label>
          <Select value={brewingMethod} onValueChange={setBrewingMethod}>
            <SelectTrigger className="w-full border-amber-200 focus:border-amber-400">
              <SelectValue placeholder="Choose your brewing method" />
            </SelectTrigger>
            <SelectContent>
              {brewingMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div>
          <Label className="text-lg font-semibold text-amber-900 mb-4 block">
            What's your budget range?
          </Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="w-full border-amber-200 focus:border-amber-400">
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
