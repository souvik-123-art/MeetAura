import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { POST_METHOD } from "../../config/index";

export default function Index({ setStep, setSuggestion }) {
  const [text, setText] = useState("");
  // Generates once on mount
  const [url] = useState(getRandomNumber());
  const [loading, setLoading] = useState(false);

  function getRandomNumber() {
    return Math.floor(Math.random() * 110) + 1;
  }

  const handleAnalysis = () => {
    // Prevent submission if text is empty
    if (!text.trim()) return;

    setLoading(true);
    Promise.resolve(
      POST_METHOD(
        "gimmick/textAnalysis/processText",
        {
          image_id: url,
          text: text,
        },
        true,
      ),
    )
      .then((data) => {
        console.log(data);
        setSuggestion(data.feedback);
        setStep(3);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to analyze your input. Please try again.", {
          theme: "dark", // Ensures the toast matches the premium dark theme
          position: "bottom-center",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // -------------------------------------------------------------
  // LOADING STATE UI
  // -------------------------------------------------------------
  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700 min-h-[450px] !space-y-6 !p-6 text-center">
        {/* Glowing Loader Wrapper */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="relative z-10">
            <Circles
              height="80"
              width="80"
              color="#c084fc" // Tailwind's purple-400 to match the theme
              ariaLabel="loading-circle"
            />
          </div>
        </div>

        <div className="flex flex-col items-center !space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            Analyzing your input...
          </h3>
          <p className="text-[15px] text-white/50 font-medium animate-pulse">
            Processing emotional subtext and sentiment
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN FORM UI
  // -------------------------------------------------------------
  return (
    <div className="w-full! flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 !p-2 sm:!p-4 relative">
    
      <ToastContainer toastClassName="!bg-[#18181b] !text-white !border !border-white/10 !rounded-xl !shadow-2xl" />

      {/* Header Section */}
      <div className="text-center flex flex-col items-center !space-y-3 !mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
          Explore Your Thoughts
        </h2>
        <p className="text-[15px] text-white/50 font-medium leading-relaxed">
          Take a moment to observe the image and share your thoughts.
        </p>
      </div>

      {/* Image Section with Glow Effect */}
      <div className="relative w-full max-w-sm group !mb-8">
        <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-purple-500/30 group-hover:blur-2xl pointer-events-none" />
        <img
          loading="lazy"
          src={`${import.meta.env.VITE_BACKEND_URL}/gimmick/textAnalysis/getMedia?id=${url}`}
          alt="Text analysis stimulus"
          className="relative w-full h-auto aspect-square object-cover rounded-2xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
          // Fallback just in case the backend image fails to load
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=800&auto=format&fit=crop";
          }}
        />
      </div>

      {/* Input Section */}
      <div className="w-full flex flex-col !mb-8">
        <label className="text-sm font-semibold text-white/80 text-center leading-snug !mb-4">
          Write about how this image makes you feel or what it reminds you of.
        </label>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 rounded-xl blur opacity-0 group-focus-within:from-purple-500/40 group-focus-within:to-indigo-500/40 group-focus-within:opacity-100 transition duration-500" />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="This image makes me feel..."
            className="relative w-full bg-[#09090b]/60 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 shadow-inner resize-y min-h-[140px] text-[15px] leading-relaxed transition-all duration-300 !p-4"
          ></textarea>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleAnalysis}
        // Automatically disables if the textarea is empty to prevent blank API calls
        disabled={text.trim().length === 0 || loading}
        className="group relative w-full max-w-sm flex items-center justify-center bg-white text-black font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none !py-3.5 !px-6"
      >
        <span className="relative z-10 flex items-center">
          Analyze Thoughts
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
    </div>
  );
}
