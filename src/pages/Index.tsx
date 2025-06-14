import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TasteQuiz from "@/components/TasteQuiz";
import { TastePreferences } from "@/types/coffee";
import { UI } from "@/constants";

const Index = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<TastePreferences | null>(null);

  const handleQuizSubmit = (prefs: TastePreferences) => {
    setPreferences(prefs);
    navigate("/beans", { state: { preferences: prefs } });
  };

  const handleReset = () => {
    setPreferences(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base sm:text-lg">☕</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {UI.APP_NAME ?? "BrewMatch"}
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium px-4">
              {UI.APP_TAGLINE ?? "Your AI-powered coffee matchmaker"}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Find Your Perfect Coffee
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Answer a few questions about your taste preferences, and we'll match you 
            with artisan coffee beans that are perfect for your palate.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <TasteQuiz onSubmit={handleQuizSubmit} onReset={handleReset} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12 sm:mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <p className="text-base sm:text-lg font-medium mb-2">
            {UI.APP_NAME ?? "BrewMatch"}
          </p>
          <p className="text-sm sm:text-base text-gray-400">
            {UI.FOOTER_TEXT ?? "Connecting coffee lovers with their perfect beans"}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
