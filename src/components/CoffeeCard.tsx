
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

interface CoffeeCardProps {
  coffee: Coffee;
}

const CoffeeCard = ({ coffee }: CoffeeCardProps) => {
  const getRoastColor = (roast: string) => {
    switch (roast.toLowerCase()) {
      case 'light':
        return 'bg-amber-100 text-amber-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'dark':
        return 'bg-amber-800 text-amber-100';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'Ethiopia': '🇪🇹',
      'Guatemala': '🇬🇹',
      'Colombia': '🇨🇴',
      'Indonesia': '🇮🇩',
      'Kenya': '🇰🇪',
    };
    return flags[country] || '🌍';
  };

  return (
    <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-900 mb-1">
              {coffee.name}
            </h3>
            <p className="text-amber-700 font-medium mb-2">
              by {coffee.roaster}
            </p>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg">{getCountryFlag(coffee.country)}</span>
              <span className="text-amber-600 font-medium">{coffee.country}</span>
              <Badge className={`${getRoastColor(coffee.roastLevel)} font-medium`}>
                {coffee.roastLevel} Roast
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-amber-900">{coffee.price}</div>
            <div className="text-sm text-amber-600">per bag</div>
          </div>
        </div>

        {/* Flavor Notes */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-amber-900 mb-2">Flavor Notes:</div>
          <div className="flex flex-wrap gap-2">
            {coffee.flavorNotes.map((note) => (
              <Badge key={note} variant="secondary" className="bg-amber-100 text-amber-800 text-xs">
                {note}
              </Badge>
            ))}
          </div>
        </div>

        {/* Brew Method */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-amber-900 mb-1">Best Brew Method:</div>
          <div className="text-amber-700 font-medium">☕ {coffee.brewMethod}</div>
        </div>

        {/* Why We Picked This */}
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-sm font-semibold text-green-800 mb-1">
            💡 Why we picked this for you:
          </div>
          <p className="text-green-700 text-sm leading-relaxed">
            {coffee.whyPicked}
          </p>
        </div>

        {/* Buy Button */}
        <Button 
          className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-2 rounded-lg transition-all duration-200"
          onClick={() => window.open(coffee.buyLink, '_blank')}
        >
          Buy Now 🛒
        </Button>
      </CardContent>
    </Card>
  );
};

export default CoffeeCard;
