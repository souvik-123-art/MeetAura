import React from "react";
import { useNavigate } from "react-router-dom";
// Assuming you have this image, otherwise it will fallback gracefully
import textAnalysisFinal from "./assets/textAnalysisFinal.webp";

// Note: I kept your prop spelling of "suggesttion" so it doesn't break your parent component,
// but I aliased it to "suggestion" locally for cleaner code.
export default function Step3({ setStep, suggesttion }) {
  const navigate = useNavigate();
  const suggestion =
    suggesttion || "No emotional insights could be generated at this time.";

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 !p-2 sm:!p-4">
      {/* Header Section */}
      <div className="text-center flex flex-col items-center !space-y-3 !mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          Analysis Complete
        </h2>
        <p className="text-[15px] text-white/50 font-medium max-w-sm leading-relaxed">
          Insights into your emotions and thoughts based on your response.
        </p>
      </div>

      {/* Image Section with Ambient Glow */}
      <div className="relative w-full max-w-sm group !mb-8">
        {/* Glowing backdrop for the final image */}
        <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-indigo-500/30 group-hover:blur-2xl pointer-events-none" />
        <img
          loading="lazy"
          src={textAnalysisFinal}
          alt="Analysis Complete"
          className="relative w-full h-auto aspect-video object-cover rounded-2xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
          // Fallback image just in case your local webp fails
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop";
          }}
        />
      </div>

      {/* Results Section (Replaced the ugly textarea) */}
      <div className="w-full max-w-sm flex flex-col !mb-10">
        <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest text-center !mb-4">
          Dominant Emotion
        </h3>

        {/* Premium Glass Panel for reading the result */}
        <div className="relative group">
          {/* Permanent subtle glow for the result box */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-100 transition duration-500" />

          <div className="relative w-full bg-[#09090b]/80 backdrop-blur-md border border-white/10 rounded-xl text-white/90 shadow-inner min-h-[160px] text-[15px] leading-relaxed text-center flex items-center justify-center !p-6">
            <p className="italic">"{suggestion}"</p>
          </div>
        </div>
      </div>

      {/* Action Button to proceed to Step 4 (History) */}
      <button
        onClick={() => navigate("/")}
        className="group relative w-full max-w-sm flex items-center justify-center bg-white text-black font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-[0.98] !py-3.5 !px-6"
      >
        <span className="relative z-10 flex items-center">
          Back To Home
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 !ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
