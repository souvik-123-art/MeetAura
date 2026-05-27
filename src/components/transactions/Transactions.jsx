import React from "react";
import { useLocation } from "react-router-dom";

const Transactions = ({ setShowTransaction }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Determine card content based on the URL pathname
  const getCardContent = () => {
    if (pathname.includes("snap")) {
      return {
        title: "Facial Mood Scan",
        subtitle:
          "Analyze your facial expressions to detect your current mood instantly.",
        buttonText: "Start Facial Scan",
        icon: (
          <svg
            className="w-10 h-10 drop-shadow-md"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fcb021"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        ),
      };
    } else if (pathname.includes("text-analysis")) {
      return {
        title: "Text Analysis",
        subtitle:
          "Type or paste your text to analyze the underlying sentiment and emotional tone.",
        buttonText: "Start Text Analysis",
        icon: (
          <svg
            className="w-10 h-10 drop-shadow-md"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fcb021"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        ),
      };
    } else if (pathname.includes("voice")) {
      return {
        title: "Voice Mood Scan",
        subtitle:
          "Record your voice and let us analyze your vocal patterns to detect your mood.",
        buttonText: "Start Voice Scan",
        icon: (
          <svg
            className="w-10 h-10 drop-shadow-md"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fcb021"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        ),
      };
    }

    // Default fallback
    return {
      title: "Mood Scanner",
      subtitle: "Select a tool to begin your analysis.",
      buttonText: "Click Here to Start",
      icon: (
        <svg
          className="w-10 h-10 drop-shadow-md"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fcb021"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    };
  };

  const currentCard = getCardContent();

  const handleNextStep = () => {
    setShowTransaction(true);
  };

  return (
    // Outer App Container - Dark background
    <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] text-white p-4!">
      {/* Main Card - Glassmorphism, subtle border, rounded corners */}
      <div className="relative w-full max-w-sm flex flex-col items-center text-center bg-[#18181b]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden p-8!">
        {/* Abstract Background Glow (Top Center) */}
        <div className="absolute -top-24 w-48 h-48 bg-[#fcb021]/20 rounded-full blur-[70px] pointer-events-none" />

        {/* Icon Wrapper - Gradient border illusion and inner shadow */}
        <div className="relative flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-2xl shadow-inner backdrop-blur-md mb-8!">
          {currentCard.icon}
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center w-full space-y-3! mb-10!">
          <h1 className="text-2xl font-bold tracking-tight text-white/95 drop-shadow-sm">
            {currentCard.title}
          </h1>
          <p className="text-[15px] font-medium text-white/50 leading-relaxed px-2!">
            {currentCard.subtitle}
          </p>
        </div>

        {/* Action Button - Gradient, hover states, active scale */}
        <button
          onClick={handleNextStep}
          className="group relative w-full flex items-center justify-center bg-gradient-to-r from-[#fcb021] to-[#f7900a] text-black font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(252,176,33,0.3)] active:scale-[0.97] p-4! mt-auto!"
        >
          {/* Button Text */}
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
            {currentCard.buttonText}
          </span>

          {/* Optional Shimmer effect overlay (requires custom animation in tailwind config, otherwise acts as a subtle hover brightener) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300 pointer-events-none" />
        </button>
      </div>
    </div>
  );
};

export default Transactions;
