import React from "react";
import selfImg1 from "../assets/image (1).png";
import selfImg2 from "../assets/image (2).png";
import selfImg from "../assets/image.png";
import { useNavigate } from "react-router-dom";

const YourSelf = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Facial Mood Scan",
      description:
        "Discover emotions like Stress, Fear, and Neutral by taking a selfie and analyzing your facial expressions.",
      image: selfImg,
      path: "/gimmick/snap?gimmick_id=1",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Text Analysis",
      description:
        "Analyze emotions like Happy, Sad, and Fear by describing a picture or expressing your thoughts.",
      image: selfImg1,
      path: "/gimmick/text-analysis?gimmick_id=2",
      gradient: "from-fuchsia-500 to-purple-600",
    },
    {
      title: "Voice Mood Scan",
      description:
        "Understand your emotional state through voice tone analysis with quick voice recordings.",
      image: selfImg2,
      path: "/gimmick/voice?gimmick_id=3",
      gradient: "from-yellow-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f9ff] via-[#fdfcff] to-[#eef4ff] px-4! py-10! md:px-10!">
      <div className="mx-auto! max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14!">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4! py-2! text-sm font-medium text-violet-700 shadow-sm">
            ✨ AI Mental Wellness Tools
          </div>

          <h1 className="mt-6! text-4xl md:text-6xl font-black tracking-tight text-slate-800 leading-tight">
            Play & Evaluate
            <span className="block bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Your Mental Health State
            </span>
          </h1>
          <h1 className="mt-6! !text-3xl md:text-6xl font-bold tracking-tight text-slate-700 leading-tight">
            (Conceptualised by Meeta Bhandula)
          </h1>

          <p className="mx-auto! mt-6! max-w-3xl text-base md:text-lg text-slate-500 leading-relaxed">
            Explore interactive AI-powered experiences to understand your
            emotions, mood, and personality through facial expressions, text,
            and voice analysis.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] cursor-pointer"
            >
              {/* Top Gradient */}
              <div className={`h-2 w-full bg-gradient-to-r ${card.gradient}`} />

              {/* Glow */}
              <div
                className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-3xl`}
              />

              <div className="relative z-10 p-7!">
                {/* Image */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${card.gradient} opacity-20 blur-2xl`}
                    />
                    <img
                      loading="lazy"
                      src={card.image}
                      alt={card.title}
                      className="relative h-26 w-26 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-6!">
                  <h2 className="text-3xl font-bold text-slate-800">
                    {card.title}
                  </h2>

                  <p className="mt-4! text-[16px] leading-7 text-slate-500">
                    {card.description}
                  </p>
                </div>

                {/* Button */}
                <button
                  className={`mt-8! w-full rounded-2xl bg-gradient-to-r ${card.gradient} px-5! py-4! text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                >
                  Start Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourSelf;
