import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-12 pb-8 text-center">
            <div className="mb-8">
              <div className="text-8xl font-bold text-foreground mb-4">
                404
              </div>
              <div className="text-6xl mb-6">☕</div>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Oops! Page not found
            </h1>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The page you're looking for doesn't exist. Let's get you back to finding great coffee.
            </p>
            
            <div className="space-y-4">
              <Button asChild className="w-full focus-ring" size="lg">
                <Link to="/">Return to Home</Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full focus-ring" size="lg">
                <Link to="/quiz">Take Coffee Quiz</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
