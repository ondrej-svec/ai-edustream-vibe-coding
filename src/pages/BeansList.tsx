import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, ExternalLink, Coffee as CoffeeIcon, Clock, Thermometer } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Coffee, Recipe, TastePreferences, RoasterContinent, RoasterCountry } from "@/types/coffee";
import { UI, ERRORS, DEFAULTS } from "@/constants";
import React from "react";

const BeansList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preferences = location.state?.preferences as TastePreferences;

  const generateRecommendations = (prefs: TastePreferences): Coffee[] => {
    const baseRecommendations: Coffee[] = [
      {
        id: "1",
        name: "Ethiopian Yirgacheffe",
        roaster: "Blue Bottle Coffee",
        roasterCountry: "United States",
        roasterContinent: "North America",
        roastLevel: "Light",
        flavorNotes: ["Fruity", "Bright", "Floral"],
        recommendedBrewMethod: "V60",
        recipe: {
          grindSize: "Medium-fine",
          coffeeRatio: "1:16 (22g coffee : 350g water)",
          waterTemp: "195°F (90°C)",
          brewTime: "3-4 minutes",
          steps: [
            "Rinse filter with hot water",
            "Add coffee and create small well in center",
            "Start timer, pour 50g water in circular motion",
            "Wait 30 seconds for bloom",
            "Continue pouring in slow circles, finish by 2:30",
            "Total brew time should be 3-4 minutes"
          ]
        },
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
        recipe: {
          grindSize: "Coarse",
          coffeeRatio: "1:15 (30g coffee : 450g water)",
          waterTemp: "200°F (93°C)",
          brewTime: "4 minutes",
          steps: [
            "Heat water to 200°F",
            "Add coarse ground coffee to press",
            "Pour hot water over grounds",
            "Stir gently and place lid (don't press yet)",
            "Steep for 4 minutes",
            "Press down slowly and serve immediately"
          ]
        },
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
        recipe: {
          grindSize: "Medium-fine",
          coffeeRatio: "1:16 (18g coffee : 290g water)",
          waterTemp: "185°F (85°C)",
          brewTime: "2 minutes",
          steps: [
            "Insert filter and rinse with hot water",
            "Add coffee and level grounds",
            "Pour water up to number 4, stir",
            "Steep for 1 minute 30 seconds",
            "Press down gently over 30 seconds",
            "Dilute with hot water if needed"
          ]
        },
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
        recipe: {
          grindSize: "Coarse",
          coffeeRatio: "1:14 (32g coffee : 450g water)",
          waterTemp: "200°F (93°C)",
          brewTime: "4 minutes",
          steps: [
            "Use coarse grind for earthy character",
            "Heat water to 200°F",
            "Add grounds and pour water in circular motion",
            "Stir once and place lid",
            "Steep for 4 minutes",
            "Press slowly to extract full body"
          ]
        },
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
        recipe: {
          grindSize: "Medium-coarse",
          coffeeRatio: "1:17 (25g coffee : 425g water)",
          waterTemp: "195°F (90°C)",
          brewTime: "4-5 minutes",
          steps: [
            "Rinse thick Chemex filter thoroughly",
            "Add coffee and create small divot",
            "Pour 50g water for 30-second bloom",
            "Pour in slow spirals, staying in center",
            "Finish pouring by 3:30, total time 4-5 minutes",
            "Clean, bright cup showcasing berry notes"
          ]
        },
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
        recipe: {
          grindSize: "Fine",
          coffeeRatio: "1:2.5 (18g coffee : 45g yield)",
          waterTemp: "200°F (93°C)",
          brewTime: "25-30 seconds",
          steps: [
            "Use 18g finely ground coffee",
            "Tamp evenly with 30lbs pressure",
            "Extract 45g in 25-30 seconds",
            "Look for honey-colored crema",
            "Perfect for milk drinks",
            "Adjust grind if extraction is off"
          ]
        },
        price: "$20",
        buyLink: "https://counterculturecoffee.com",
        shopName: "Counter Culture Coffee",
        shopLocation: "Durham, NC",
        whyPicked: "Excellent for espresso and milk drinks with chocolate and nut characteristics.",
      }
    ];

    if (!prefs) return baseRecommendations.slice(0, 3);
    return baseRecommendations
      .filter(coffee => {
        // Geographic filtering
        if (prefs.roasterCountry) {
          if (coffee.roasterCountry !== prefs.roasterCountry) return false;
        } else if (prefs.roasterContinent) {
          if (coffee.roasterContinent !== prefs.roasterContinent) return false;
        }
        // Roast level filter
        const roastMatch = !prefs.roastLevel || coffee.roastLevel.toLowerCase() === prefs.roastLevel.toLowerCase();
        // Flavor notes filter
        const flavorMatch = !prefs.flavors || prefs.flavors.length === 0 || coffee.flavorNotes.some(note =>
          prefs.flavors.some(prefFlavor =>
            note.toLowerCase().includes(prefFlavor.toLowerCase())
          )
        );
        // Add more filters as needed (budget, milkPreference, etc.)
        return roastMatch || flavorMatch;
      })
      .slice(0, 6);
  };

  const recommendations = generateRecommendations(preferences);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{UI.CARD_TITLE}</h1>
                <p className="text-sm text-gray-600">{UI.CARD_SUBTITLE}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {preferences && (
          <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Flavors:</span>
                <p className="text-gray-600">{preferences.flavors.join(", ")}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Budget:</span>
                <p className="text-gray-600">{preferences.budget}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Milk Preference:</span>
                <p className="text-gray-600">{preferences.milkPreference}</p>
              </div>
              {preferences.roastLevel && (
                <div>
                  <span className="font-medium text-gray-700">Roast:</span>
                  <p className="text-gray-600">{preferences.roastLevel}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recommendations.map((coffee) => (
            <Card key={coffee.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">{coffee.name}</CardTitle>
                    <p className="text-sm text-gray-600">{coffee.roaster}</p>
                  </div>
                  <span className="text-xl font-bold text-gray-900">{coffee.price}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Roaster Country:</span>
                    <span className="text-gray-900">{coffee.roasterCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Roast:</span>
                    <span className="text-gray-900">{coffee.roastLevel}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Flavor Notes:</p>
                  <div className="flex flex-wrap gap-2">
                    {coffee.flavorNotes.map((note) => (
                      <Badge key={note} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 italic">"{coffee.whyPicked}"</p>
                </div>

                {/* Recommended Brewing Method */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <CoffeeIcon className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Recommended: {coffee.recommendedBrewMethod}</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-medium">Grind:</span>
                      <span className="text-green-800">{coffee.recipe.grindSize}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-medium">Ratio:</span>
                      <span className="text-green-800">{coffee.recipe.coffeeRatio}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">{coffee.recipe.waterTemp}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">{coffee.recipe.brewTime}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-green-800 mb-2">Brewing Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-green-700">
                      {coffee.recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{coffee.shopName} • {coffee.shopLocation}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                    onClick={() => window.open(coffee.buyLink, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buy from {coffee.shopName}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <div className={UI.EMPTY_STATE_ICON_CLASS}>
              <span className="text-2xl">{UI.EMPTY_STATE_ICON}</span>
            </div>
            <h3 className={UI.EMPTY_STATE_TITLE_CLASS}>
              {UI.EMPTY_STATE_TITLE}
            </h3>
            <p className={UI.EMPTY_STATE_MESSAGE_CLASS}>
              {UI.EMPTY_STATE_MESSAGE}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BeansList;
