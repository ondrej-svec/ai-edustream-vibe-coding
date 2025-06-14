import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CoffeeCard from "@/components/CoffeeCard";
import { Coffee, TastePreferences } from "@/types/coffee";
import { UI, ERRORS, DEFAULTS } from "@/constants";

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
        roasterCountry: "United States",
        roasterContinent: "North America",
        roastLevel: "Light",
        flavorNotes: ["Fruity", "Bright", "Floral"],
        recommendedBrewMethod: "V60",
        price: "$18",
        buyLink: "#",
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
        buyLink: "#",
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
        buyLink: "#",
        whyPicked: "The caramel sweetness and smooth body align perfectly with your preferences.",
      },
      {
        id: "4",
        name: "Sumatra Mandheling",
        roaster: "Intelligentsia",
        roasterCountry: "United States",
        roasterContinent: "North America",
        roastLevel: "Dark",
        flavorNotes: ["Earthy", "Wild", "Full-bodied"],
        recommendedBrewMethod: "French Press",
        price: "$17",
        buyLink: "#",
        whyPicked: "For those seeking adventure - this wild, earthy profile will surprise and delight.",
      },
      {
        id: "5",
        name: "Kenya AA",
        roaster: "Ritual Coffee",
        roasterCountry: "United States",
        roasterContinent: "North America",
        roastLevel: "Light",
        flavorNotes: ["Bright", "Fruity", "Wine-like"],
        recommendedBrewMethod: "Chemex",
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
    <Card className={UI.CARD_CLASS}>
      <CardHeader className={UI.CARD_HEADER_CLASS}>
        <CardTitle className={UI.CARD_TITLE_CLASS}>
          {UI.CARD_TITLE}
        </CardTitle>
        <p className={UI.CARD_SUBTITLE_CLASS}>
          {UI.CARD_SUBTITLE}
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
      </CardContent>
    </Card>
  );
};

export default RecommendationsPanel;
