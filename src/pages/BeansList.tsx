
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { TastePreferences } from "@/pages/Index";

interface Coffee {
  id: string;
  name: string;
  roaster: string;
  country: string;
  roastLevel: string;
  flavorNotes: string[];
  brewMethod: string;
  price: string;
  buyLink: string;
  shopName: string;
  shopLocation: string;
  whyPicked: string;
  image?: string;
}

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
        country: "Ethiopia",
        roastLevel: "Light",
        flavorNotes: ["Fruity", "Bright", "Floral"],
        brewMethod: "V60",
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
        country: "Guatemala", 
        roastLevel: "Medium",
        flavorNotes: ["Chocolatey", "Nutty", "Balanced"],
        brewMethod: "French Press",
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
        country: "Colombia",
        roastLevel: "Medium",
        flavorNotes: ["Caramel", "Nutty", "Smooth"],
        brewMethod: "Aeropress",
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
        country: "Indonesia",
        roastLevel: "Dark",
        flavorNotes: ["Earthy", "Wild", "Full-bodied"],
        brewMethod: "French Press",
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
        country: "Kenya",
        roastLevel: "Light",
        flavorNotes: ["Bright", "Fruity", "Wine-like"],
        brewMethod: "Chemex",
        price: "$22",
        buyLink: "https://ritualcoffee.com",
        shopName: "Ritual Coffee Roasters",
        shopLocation: "San Francisco, CA",
        whyPicked: "The bright acidity and complex fruit notes match your sophisticated palate.",
      }
    ];

    if (!prefs) return baseRecommendations.slice(0, 3);

    return baseRecommendations
      .filter(coffee => {
        const roastMatch = !prefs.roastLevel || coffee.roastLevel.toLowerCase() === prefs.roastLevel.toLowerCase();
        const flavorMatch = coffee.flavorNotes.some(note => 
          prefs.flavors.some(prefFlavor => 
            note.toLowerCase().includes(prefFlavor.toLowerCase())
          )
        );
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
                <h1 className="text-2xl font-semibold text-gray-900">Your Perfect Coffee Matches</h1>
                <p className="text-sm text-gray-600">Curated based on your taste preferences</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((coffee) => (
            <Card key={coffee.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{coffee.name}</CardTitle>
                    <p className="text-sm text-gray-600">{coffee.roaster}</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{coffee.price}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Origin:</span>
                    <span className="text-gray-900">{coffee.country}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Roast:</span>
                    <span className="text-gray-900">{coffee.roastLevel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Best for:</span>
                    <span className="text-gray-900">{coffee.brewMethod}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Flavor Notes:</p>
                  <div className="flex flex-wrap gap-1">
                    {coffee.flavorNotes.map((note) => (
                      <span key={note} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 italic">"{coffee.whyPicked}"</p>
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
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Expanding Your Horizons
            </h3>
            <p className="text-gray-600">
              We're finding some unique matches that might surprise you! 
              Try adjusting your preferences to see more options.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BeansList;
