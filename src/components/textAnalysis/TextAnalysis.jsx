import React, { useState, useEffect } from "react";
import { GET_METHOD } from "../../config/index";

// Import your sub-components
import Transaction from "../transactions/Transactions";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

// Optional: If you don't have this image locally, you can use a high-quality placeholder or SVG
import TextAnalysisImage from "./assets/textAnalysis.webp";

export default function Index() {
  const [step, setStep] = useState(1);
  const [suggestion, setSuggestion] = useState("");
  const [hasPaid, setHasPaid] = useState(false); // null = loading
  const [payData, setPayData] = useState({});

  // useEffect(() => {
  //   // Simulating API call for demonstration. Replace with your actual GET_METHOD
  //   GET_METHOD(`gimmick/transaction/pointsStatus?gimmick_id=2`, true)
  //     .then((data) => {
  //       setHasPaid(data.transaction);
  //       setPayData(data);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch transaction status", err);
  //       setHasPaid(false); // Defaulting to false on error to show payment screen
  //     });
  // }, []);

  // If not paid, show the modern Transaction component
  if (!hasPaid) {
    return <Transaction setShowTransaction={setHasPaid} payData={payData} />;
  }

  // If paid, show the main application flow
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] text-white !p-4">
      {/* Main Application Container
        Utilizes glassmorphism, subtle borders, and smooth shadows
      */}
      <div className="relative w-full max-w-2xl flex flex-col items-center bg-[#18181b]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500">
        {/* Background ambient glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#fcb021]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center !p-8 sm:!p-10">
          {step === 1 && (
            <div className="w-full flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
              {/* Badge/Icon Header */}
              <div className="inline-flex items-center justify-center !px-4 !py-1.5 rounded-full bg-white/5 border border-white/10 !mb-6">
                <span className="w-2 h-2 rounded-full bg-[#fcb021] animate-pulse !mr-2" />
                <span className="text-xs font-semibold tracking-wider text-white/70 uppercase">
                  Text Analysis Tool
                </span>
              </div>

              {/* Title Section */}
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/95 !mb-3">
                Uncover Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fcb021] to-yellow-400">
                  Thoughts
                </span>
              </h1>

              <p className="text-base text-white/50 font-medium max-w-sm leading-relaxed !mb-8">
                Let’s analyze how you feel through thoughtful imagery and guided
                expression.
              </p>

              {/* Image Container with premium styling */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group !mb-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={TextAnalysisImage}
                  alt="Text Analysis Visualization"
                  // Fallback if image fails to load
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => setStep(2)}
                className="group relative w-full sm:w-auto min-w-[240px] flex items-center justify-center bg-white text-black font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-[0.97] !px-8 !py-4"
              >
                <span className="relative z-10 flex items-center">
                  Begin Analysis
                  <svg
                    className="w-5 h-5 !ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}

          {/* Conditional rendering for subsequent steps */}
          {step === 2 && (
            <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500">
              <Step2 setStep={setStep} setSuggestion={setSuggestion} />
            </div>
          )}

          {step === 3 && (
            <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500">
              <Step3 suggesttion={suggestion} setStep={setStep} />
            </div>
          )}

          {step === 4 && (
            <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500">
              <Step4 setSuggestion={setSuggestion} setStep={setStep} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
