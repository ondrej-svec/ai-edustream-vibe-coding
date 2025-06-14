import { useNavigate } from "react-router-dom";
import { TastePreferences } from "@/types/coffee";
import TasteQuiz from "@/components/TasteQuiz";

const Quiz = () => {
  const navigate = useNavigate();

  const handleQuizSubmit = (preferences: TastePreferences) => {
    // Navigate to beans list with preferences
    navigate("/beans", { state: { preferences } });
  };

  const handleQuizReset = () => {
    // Navigate back to home
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <TasteQuiz onSubmit={handleQuizSubmit} onReset={handleQuizReset} />
    </div>
  );
};

export default Quiz; 