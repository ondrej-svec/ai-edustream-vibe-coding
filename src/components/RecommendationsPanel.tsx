
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TastePreferences } from "@/pages/Index";
import CoffeeCard from "@/components/CoffeeCard";

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
  whyPicked: string;
  image?: string;
}

interface RecommendationsPanelProps {
  preferences: TastePreferences;
}

const RecommendationsPanel = ({ preferences }: RecommendationsPanelProps) => {
  // Mock AI recommendations based on preferences
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
        buyLink: "#",
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
        buyLink: "#",
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
        buyLink: "#",
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
        buyLink: "#",
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
        buyLink: "#",
        whyPicked: "The bright acidity and complex fruit notes match your sophisticated palate.",
      }
    ];

    // Filter and sort based on preferences
    return baseRecommendations
      .filter(coffee => {
        // Match roast level
        const roastMatch = coffee.roastLevel.toLowerCase() === prefs.roastLevel.toLowerCase();
        
        // Check if any flavor notes match preferences
        const flavorMatch = coffee.flavorNotes.some(note => 
          prefs.flavors.some(prefFlavor => 
            note.toLowerCase().includes(prefFlavor.toLowerCase())
          )
        );
        
        return roastMatch || flavorMatch;
      })
      .slice(0, 3); // Return top 3 matches
  };

  const recommendations = generateRecommendations(preferences);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
        <CardTitle className="text-2xl text-amber-900 text-center">
          🎯 Your Perfect Matches
        </CardTitle>
        <p className="text-amber-700 text-center">
          Curated just for you based on your taste preferences
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {recommendations.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
        
        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">
              Expanding Your Horizons
            </h3>
            <p className="text-amber-700">
              We're finding some unique matches that might surprise you! 
              Try adjusting your preferences to see more options.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationsPanel;
