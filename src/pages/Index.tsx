import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TasteQuiz from "@/components/TasteQuiz";
import { TastePreferences } from "@/types/coffee";

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
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">☕</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">BrewMatch</h1>
            </div>
            <p className="text-gray-600 font-medium">
              Your AI-powered coffee matchmaker
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect Coffee
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Answer a few questions about your taste preferences, and we'll match you 
            with artisan coffee beans that are perfect for your palate.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <TasteQuiz onSubmit={handleQuizSubmit} onReset={handleReset} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-lg font-medium mb-2">BrewMatch</p>
          <p className="text-gray-400">Connecting coffee lovers with their perfect beans</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
