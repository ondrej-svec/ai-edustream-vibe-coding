import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coffee, TastePreferences } from "@/types/coffee";
import { coffeeService } from "@/services/coffeeService";
import { UserPreferences, CoffeeMatch } from "@/types/coffee-api";

// Coffee Image Component with fallback placeholder
const CoffeeImage = ({ src, alt, className }: { src?: string; alt: string; className?: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Show placeholder if no src, image failed to load, or still loading
  if (!src || imageError) {
    return (
      <div className={`bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center ${className}`}>
        <div className="text-center space-y-3">
          <div className="text-4xl opacity-60">☕</div>
          <div className="text-sm text-muted-foreground font-medium">Coffee Image</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="text-4xl opacity-60 animate-pulse">☕</div>
            <div className="text-sm text-muted-foreground font-medium">Loading...</div>
          </div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt}
        className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

const BeansList = () => {
  const location = useLocation();
  const [preferences] = useState<TastePreferences | null>(
    location.state?.preferences || null
  );
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert TastePreferences to UserPreferences for API
  const convertToUserPreferences = (prefs: TastePreferences): UserPreferences => {
    // Map budget string to budget range
    const budgetMap: Record<string, { min: number; max: number }> = {
      'budget': { min: 10, max: 15 },
      'mid-range': { min: 15, max: 25 },
      'premium': { min: 25, max: 40 },
    };

    // Map milk preference to drinking style
    const drinkingStyleMap: Record<string, UserPreferences['drinking_style']> = {
      'black': 'black',
      'milk': 'milk',
      'plant-milk': 'plant',
      'cream': 'cream',
      'sugar': 'sweetened',
    };

    const budgetRange = budgetMap[prefs.budget] || { min: 15, max: 25 };

    return {
      flavor_notes: prefs.flavors,
      budget_min: budgetRange.min,
      budget_max: budgetRange.max,
      drinking_style: drinkingStyleMap[prefs.milkPreference || 'black'] || 'black',
      roast_preference: prefs.roastLevel as 'light' | 'medium' | 'dark' | undefined,
      brew_methods: prefs.brewingMethod ? [prefs.brewingMethod] : undefined,
      roaster_continent: prefs.roasterContinent,
      roaster_country: prefs.roasterCountry,
    };
  };

  // Convert API response to Coffee format
  const convertToCoffee = (apiCoffee: CoffeeMatch, index: number): Coffee => {
    return {
      id: (index + 1).toString(),
      name: apiCoffee.name,
      roaster: apiCoffee.roaster,
      roasterCountry: "Unknown", // API doesn't provide this
      roasterContinent: "North America", // Default to North America
      roastLevel: apiCoffee.roastLevel,
      flavorNotes: apiCoffee.flavorNotes,
      price: `$${apiCoffee.price}`,
      buyLink: apiCoffee.purchaseLink,
      whyPicked: `Perfect match for your taste preferences. Best enjoyed with ${apiCoffee.brewMethodFit.join(' or ')}.`,
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    };
  };

  useEffect(() => {
    const fetchCoffeeRecommendations = async () => {
      if (!preferences) {
        console.log("No preferences provided, using mock data");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log("🔍 API Debug Info:");
        console.log("  VITE_API_URL:", import.meta.env.VITE_API_URL);
        console.log("  Using service:", coffeeService.matchCoffee.name);
        console.log("  Preferences:", preferences);
        
        const userPrefs = convertToUserPreferences(preferences);
        console.log("  Converted API preferences:", userPrefs);
        
        console.log("🚀 Making API call...");
        const response = await coffeeService.matchCoffee(userPrefs);
        console.log("✅ API Response received:", response);
        
        const convertedCoffees = response.matches.map(convertToCoffee);
        setCoffees(convertedCoffees);
      } catch (err) {
        console.error("Error fetching coffee recommendations:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch recommendations");
        
        // Fallback to mock data on error
        const mockCoffees: Coffee[] = [
          {
            id: "1",
            name: "Ethiopian Yirgacheffe",
            roaster: "Blue Bottle Coffee",
            roasterCountry: "United States", 
            roasterContinent: "North America",
            roastLevel: "light",
            flavorNotes: ["bright", "citrusy", "floral"],
            price: "$18.95",
            buyLink: "#",
            whyPicked: "Perfect match for your bright and citrusy preferences with delicate floral notes.",
            image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
          },
          {
            id: "2", 
            name: "Colombian Huila",
            roaster: "Counter Culture Coffee",
            roasterCountry: "United States",
            roasterContinent: "North America", 
            roastLevel: "medium",
            flavorNotes: ["chocolatey", "nutty", "sweet"],
            price: "$16.50",
            buyLink: "#",
            whyPicked: "Rich chocolate and nutty flavors that align with your taste profile.",
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
          }
        ];
        setCoffees(mockCoffees);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeRecommendations();
  }, [preferences]);

  // Helper function to format preference labels
  const formatPreferenceLabel = (value: string) => {
    return value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="space-y-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              ☕ Curated for You
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Your Perfect Coffee Beans
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
              Based on your taste preferences, we've found these exceptional{" "}
              <span className="text-primary font-semibold">artisan coffee beans</span>{" "}
              that match your flavor profile perfectly.
            </p>
          </div>
        </div>

        {/* Preferences Summary - Only show if preferences exist */}
        {preferences && (
          <Card className="mb-8 max-w-4xl mx-auto shadow-md border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold">Your Taste Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {/* Essential preferences - horizontal layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm">💰</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-foreground text-sm">Budget</h4>
                    <Badge variant="secondary" className="text-xs px-2 py-1">
                      {formatPreferenceLabel(preferences.budget)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-sm">🎯</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-foreground text-sm">Flavors</h4>
                    <div className="flex flex-wrap gap-1">
                      {preferences.flavors.map((flavor) => (
                        <Badge key={flavor} variant="outline" className="text-xs px-2 py-0.5">
                          {formatPreferenceLabel(flavor)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional preferences - compact horizontal layout */}
              {(preferences.roastLevel || preferences.brewingMethod || preferences.milkPreference || preferences.roasterContinent) && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {preferences.roastLevel && (
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-background/50 border border-border/30">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 text-xs">🔥</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Roast</p>
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          {formatPreferenceLabel(preferences.roastLevel)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  {preferences.brewingMethod && (
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-background/50 border border-border/30">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-xs">⚗️</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Brew</p>
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          {formatPreferenceLabel(preferences.brewingMethod)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  {preferences.milkPreference && (
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-background/50 border border-border/30">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 text-xs">🥛</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Milk</p>
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          {formatPreferenceLabel(preferences.milkPreference)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  {preferences.roasterContinent && (
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-background/50 border border-border/30">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-xs">🌍</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Location</p>
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          {preferences.roasterCountry || preferences.roasterContinent}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Finding your perfect coffee matches...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg max-w-md mx-auto">
              <p className="font-medium">Unable to fetch recommendations</p>
              <p className="text-sm mt-2">{error}</p>
              <p className="text-sm mt-2">Showing fallback recommendations instead.</p>
            </div>
          </div>
        )}

        {/* Coffee Recommendations Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground text-center">
            {loading ? "Loading..." : "Recommended for You"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coffees.map((coffee) => (
              <Card key={coffee.id} className="card-hover overflow-hidden h-fit">
                <div className="relative">
                  <CoffeeImage 
                    src={coffee.image}
                    alt={coffee.name}
                    className="w-full h-48"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-background/90 text-foreground text-xs">
                      {formatPreferenceLabel(coffee.roastLevel)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg leading-tight">{coffee.name}</h3>
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-sm font-medium">{coffee.roaster}</p>
                      <p className="text-muted-foreground text-xs">{coffee.roasterCountry}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Flavor Notes</h4>
                      <div className="flex flex-wrap gap-1">
                        {coffee.flavorNotes.map((note) => (
                          <Badge key={note} variant="outline" className="text-xs">
                            {formatPreferenceLabel(note)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Why We Picked This</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {coffee.whyPicked}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xl font-bold text-foreground">
                      {coffee.price}
                    </span>
                    <Button size="sm" className="focus-ring">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Back to Quiz Section */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            Not finding what you're looking for?
          </p>
          <Link to="/quiz">
            <Button variant="outline" size="lg" className="focus-ring">
              Retake Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeansList;
