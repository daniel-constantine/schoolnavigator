import { Sparkles } from "lucide-react";
import "./AiAssistantBanner.css";

const AIAssistantBanner = () => {
  return null;

  // TODO: enable AI when it's ready
  return (
    <div className="ai-assistant-banner" data-testid="ai-assistant-banner">
      <div className="ai-icon">
        <Sparkles size={24} />
      </div>

      <div className="ai-content">
        <h3>Need help finding the perfect school?</h3>
        <p>
          Chat with our AI assistant to get personalized recommendations,
          compare schools, and find answers to all your questions about NYC
          kindergarten schools.
        </p>
      </div>

      <button type="button" className="ai-button">
        <Sparkles size={18} />
        Ask AI Assistant
      </button>
    </div>
  );
};

export default AIAssistantBanner;
