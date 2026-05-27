import React from "react";
import { useNavigate } from "react-router-dom";

export default function Step3({ setStep, suggestedActivity }) {
  const navigate = useNavigate();

  // Fallback colors just in case the API data is slightly delayed or missing
  const c1 = suggestedActivity?.color1 || "#FF3B7C";
  const c2 = suggestedActivity?.color2 || "#FF8A00";
  const c3 = suggestedActivity?.color3 || "#f97316";

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-700 !p-2 sm:!p-4 relative">
      {/* Main Card Container 
        Using the solid dark background (#151419) with a smooth deep shadow.
      */}
      <div className="relative w-full max-w-sm flex flex-col items-center text-center !p-8 sm:!p-10 z-10">
        {/* Subtle top-right ambient glow using your dynamic color */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
          style={{ backgroundColor: c1, opacity: 0.15 }}
        />

        {/* --- CONTENT SECTION --- */}

        {/* Small Context Pill (Dark gray) */}
        <div className="inline-flex items-center justify-center !px-4 !py-1.5 rounded-full bg-[#242329] !mb-5 z-10">
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Recommended Activity
          </span>
        </div>

        {/* Dynamic Title 
          Applies your dynamic colors directly to the text to create a vibrant gradient
        */}
        <h3
          className="relative z-10 text-3xl sm:text-4xl font-black tracking-tight uppercase !mb-8"
          style={{
            backgroundImage: `linear-gradient(to right, ${c1}, ${c2})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent", // Fallback
          }}
        >
          {suggestedActivity?.title || "Activity"}
        </h3>

        {/* Icon with focused glowing backdrop effect */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 group !mb-8 z-10">
          {/* Dynamic pulsing glow based on the passed color */}
          <div
            className="absolute inset-2 rounded-full blur-2xl transition-all duration-700 pointer-events-none animate-pulse"
            style={{ backgroundColor: c1, opacity: 0.4 }}
          />
          <img
            loading="lazy"
            className="relative w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
            src={suggestedActivity?.icon}
            alt="Activity Icon"
            onError={(e) => {
              // Fallback image in case the URL is broken
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/3389/3389081.png";
            }}
          />
        </div>

        {/* Description (Soft gray text) */}
        <p className="relative z-10 text-[15px] text-gray-300 font-medium leading-relaxed !mb-10 max-w-[280px] !px-2">
          {suggestedActivity?.desc ||
            "Take a moment to engage in this activity to balance your energy."}
        </p>

        {/* --- ACTION BUTTON --- 
          Back to Home Button using dynamic gradient and navigation
        */}
        <button
          onClick={() => navigate("/")}
          className="relative z-10 group w-full flex items-center justify-center text-white font-extrabold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:brightness-110 active:scale-[0.97] !py-4 !px-6"
          style={{
            backgroundImage: `linear-gradient(to right, red, ${c2})`,
            // Appends '40' (hex for ~25% opacity) to the color for a matching drop-shadow
            boxShadow: `0 8px 30px ${c1}40`,
          }}
        >
          <span className="relative z-10 flex items-center drop-shadow-sm">
            <svg
              className="w-5 h-5 !mr-2 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </span>
        </button>
      </div>
    </div>
  );
}
