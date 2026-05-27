import React, { useContext, useEffect, useState, useRef } from "react";

import styles from "./mystyle.module.css";

import Step2 from "./Step2";
// import Step3 from "./Step3"
// import Step4 from "./Step4"

export default function Index({ auraData, setSuggestedActivity, setStep }) {
  // const [auraData, setAuraData] = useState(null);

  // const [text, setText] = useState("");
  // const [url,setUrl] = useState(`${import.meta.env.VITE_BACKEND_URL}/gimmick/textAnalysis/getMedia?id=`+getRandomNumber());

  const { aura, suggestedActivity } = auraData;

  console.log(auraData);

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 !p-2 sm:!p-4 relative">
      {/* Main Glass Card Container */}
      <div className="relative w-full max-w-sm flex flex-col bg-transparent items-center text-center !p-8 sm:!p-10">
        {/* Ambient Background Glows inside the card */}

        {/* --- CONDITIONAL CLOSE BUTTON --- */}
        {/* If there's no suggested activity, show the modern X button at the top right */}
        {!suggestedActivity && (
          <button
            onClick={() => setStep(4)}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-white/50 hover:text-red-400 backdrop-blur-md transition-all duration-300 z-20"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* --- CONTENT SECTION --- */}

        {/* Tiny pill badge for context */}
        <div className="inline-flex items-center justify-center !px-3 !py-1 rounded-full bg-white/5 border border-white/10 !mb-4 z-10">
          <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
            Today's Aura
          </span>
        </div>

        {/* Dynamic Emotion Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-orange-400 !mb-8 z-10">
          {aura?.aura_emotion || "Unknown"}
        </h2>

        {/* Aura Image with Pulsing Glow */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 group !mb-8 z-10">
          <div className="absolute inset-0 bg-pink-500/30 rounded-full blur-2xl transition-all duration-700 group-hover:bg-pink-500/40 group-hover:blur-3xl animate-pulse pointer-events-none" />
          <img
            loading="lazy"
            className="relative w-full h-full object-cover rounded-full border-[3px] border-white/10 shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-transform duration-700 group-hover:scale-105"
            src={aura?.aura_icon}
            alt={aura?.aura_emotion || "Aura"}
            // Fallback image in case the icon URL is broken
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=400&auto=format&fit=crop";
            }}
          />
        </div>

        {/* Dynamic Description */}
        <p className="text-[15px] text-white/60 font-medium leading-relaxed !mb-10 z-10 !px-2">
          {aura?.auro_desc || "Your aura is radiating unique energy today."}
        </p>

        {/* --- CONDITIONAL ACTION BUTTON --- */}
        {suggestedActivity && (
          <button
            onClick={() => {
              // Safety check: ensure it's an array before grabbing [0]
              if (
                Array.isArray(suggestedActivity) &&
                suggestedActivity.length > 0
              ) {
                setSuggestedActivity(suggestedActivity[0]);
              }
              setStep(3);
            }}
            className="group relative w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-400 hover:to-orange-400 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-[0.97] !py-3.5 !px-6 z-10"
          >
            <span className="relative z-10 flex items-center">
              Suggest Activity
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
