import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        {/* Hero Section */}
        <div className="text-center space-y-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium shadow-sm">
                ☕ Powered by AI
              </Badge>
            </div>
            
            <div className="space-y-6 animate-fade-in-delay">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text">
                Find Your Perfect Coffee
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
                Answer a few questions about your taste preferences, and we'll match you with{" "}
                <span className="text-primary font-semibold">artisan coffee beans</span>{" "}
                that are perfect for your palate.
              </p>
            </div>
          </div>

          {/* Main CTA Card */}
          <div className="animate-fade-in-delay-2">
            <Card className="p-8 sm:p-12 max-w-2xl mx-auto card-hover shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <div className="space-y-12 text-center">
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
                    Coffee Taste Profile
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
                    Tell us your preferences to find your perfect match
                  </p>
                </div>
                
                <div className="pt-4">
                  <Link to="/quiz">
                    <Button 
                      size="lg" 
                      className="text-lg px-10 py-6 focus-ring shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Start Your Journey
                      <span className="ml-2">→</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto animate-fade-in-delay-3">
            <Card className="p-8 card-hover group shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-card/30 backdrop-blur-sm">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary-foreground text-2xl">🎯</span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-xl text-foreground">Personalized Matching</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Advanced AI algorithms analyze your taste preferences for perfect recommendations
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 card-hover group shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-card/30 backdrop-blur-sm">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-accent-foreground text-2xl">🌍</span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-xl text-foreground">Artisan Roasters</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Curated selection from premium coffee roasters worldwide, handpicked for quality
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 card-hover group shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-card/30 backdrop-blur-sm">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary-foreground text-2xl">⚡</span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-xl text-foreground">Instant Results</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Get personalized coffee recommendations in seconds, ready to order
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Additional social proof or secondary CTA could go here */}
          <div className="animate-fade-in-delay-4 pt-12">
            <p className="text-muted-foreground text-sm">
              Join thousands of coffee lovers who found their perfect brew
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
