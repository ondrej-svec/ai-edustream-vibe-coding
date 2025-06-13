
import { useState } from "react";
import TasteQuiz from "@/components/TasteQuiz";
import RecommendationsPanel from "@/components/RecommendationsPanel";

export interface TastePreferences {
  roastLevel: string;
  flavors: string[];
  brewingMethod: string;
  budget: string;
}

const Index = () => {
  const [preferences, setPreferences] = useState<TastePreferences | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleQuizSubmit = (prefs: TastePreferences) => {
    setPreferences(prefs);
    setShowRecommendations(true);
  };

  const handleReset = () => {
    setPreferences(null);
    setShowRecommendations(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">☕</span>
              </div>
              <h1 className="text-3xl font-bold text-amber-900">BrewMatch</h1>
            </div>
            <p className="text-amber-700 hidden md:block font-medium">
              Your AI-powered coffee matchmaker
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Find Your Perfect Coffee
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Answer a few questions about your taste preferences, and we'll match you 
            with artisan coffee beans that are perfect for your palate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Taste Quiz Section */}
          <div className="order-2 lg:order-1">
            <TasteQuiz onSubmit={handleQuizSubmit} onReset={handleReset} />
          </div>

          {/* Recommendations Section */}
          <div className="order-1 lg:order-2">
            {showRecommendations && preferences ? (
              <RecommendationsPanel preferences={preferences} />
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl">🫘</span>
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">
                  Ready to Discover?
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  Complete the taste quiz to see your personalized coffee recommendations. 
                  We'll find beans that match your unique preferences perfectly.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-lg font-medium mb-2">BrewMatch</p>
          <p className="text-amber-200">Connecting coffee lovers with their perfect beans</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
