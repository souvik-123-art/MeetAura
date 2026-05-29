import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./voice.css";
import mic from "./assets/mic.png";
import image from "./assets/image.webp";
import circle from "./assets/Ellipse 33.png";
import analyze from "./assets/layer.png";
import Transaction from "../transactions/Transactions";
import { GET_METHOD } from "../../config/index";

import { POST_METHOD } from "../../config/index";

import Step2 from "../snap/Step2";
import Step3 from "./Step3";
import VoiceStep4 from "./voiceStep4";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import AccessModal from "../accessModal";

export default function Index() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPaid, setHasPaid] = useState(true); // null = loading
  const [payData, setPayData] = useState({});

  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   GET_METHOD(`gimmick/transaction/pointsStatus?gimmick_id=2`, true)
  //     .then((data) => {
  //       console.log("Whether User has paid : ", data.transaction);
  //       setHasPaid(data.transaction);
  //       // setHasPaid(false);
  //       setPayData(data);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch transaction status", err);
  //       toast.error("Failed to fetch transaction status. Please try again.");
  //       setHasPaid(false);
  //     });
  // }, []);

  const mediaRecorderRef = useRef(null);

  const [auraData, setAuraData] = useState({
    aura: {
      aura_emotion: "NEUTRAL",
      aura_icon: `${import.meta.env.VITE_BACKEND_URL}/gimmick/textAnalysis/getEmotion?id=NEUTRAL`,
      auro_desc:
        "Your current emotion shows that you You are feeling indiffrent, nothing in particular",
      color1: "#FFF7DB",
      color2: "#FF7373",
      color3: "#FFF7DB",
    },
    suggestedActivity: [
      {
        title: "Boost your happiness today",
        sub_title: "Take 5 minutes to daydream or reflect.",
        desc: "Take 5 minutes to daydream or reflect.",
        icon: `${import.meta.env.VITE_BACKEND_URL}/gimmick/textAnalysis/getSuggestion?emotion=NEUTRAL&id=1`,
        color1: "#FFFCE0",
        color2: "#FCB9BA",
        color3: "#FFFCE0",
      },
      {
        title: "Boost your happiness today",
        sub_title: "Plan a small, enjoyable task for the day.",
        desc: "Plan a small, enjoyable task for the day.",
        icon: `${import.meta.env.VITE_BACKEND_URL}/gimmick/textAnalysis/getSuggestion?emotion=NEUTRAL&id=2`,
        color1: "#FFF7DB",
        color2: "#FF7373",
        color3: "#FFF7DB",
      },
      {
        title: "Boost your happiness today",
        sub_title: "Do a simple stretching routine to energize your body",
        desc: "Do a simple stretching routine to energize your body",
        icon: `${import.meta.env.VITE_BACKEND_URL}/gimmick/textAnalysis/getSuggestion?emotion=NEUTRAL&id=3`,
        color1: "#FFF7DB",
        color2: "#FF7373",
        color3: "#FFF7DB",
      },
    ],
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        try {
          const audio = new Blob(chunks, { type: "audio/webm" });
          console.log("Audio blob created. Size:", audio.size, "bytes");
          setAudioBlob(audio);
        } catch (err) {
          console.error("Error while creating audio blob:", err);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      console.log("Recording started...");
    } catch (err) {
      console.error("Microphone access denied:", err);
      setShowModal(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("Recording stopped.");
    }
  };

  const handleClearAudio = () => {
    if (audioBlob) {
      URL.revokeObjectURL(URL.createObjectURL(audioBlob));
    }
    setAudioBlob(null);
    setIsFileUploaded(false);
    console.log("Audio cleared by user.");
  };

  const handleProcessVoice = async () => {
    if (!audioBlob) return alert("No audio recorded yet.");

    if (audioBlob.size < 1000) {
      alert("Audio too short or empty. Please record again.");
      return;
    }

    setIsProcessing(true);
    setIsFileUploaded(true);
    console.log("Uploading Voice...");

    const formData = new FormData();
    formData.append("voice", audioBlob, "voice.mp3");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/gimmick/auraVoice/uploadVoice`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI5NzQ4MDkxLCJleHAiOjE3Mjk3NTE2OTF9.Hz_ghfDb3yMhxMwvAYDOYbFkSuU9J6faP3g8r-sBxQU",
          },
        },
      );

      console.log("Upload Response", res.data);
      console.log("Voice Uploaded Successfully");

      const filename = res.data.file_details?.file_name;

      console.log("Sending file_name to processVoice:", filename);
      console.log("File type:", res.data?.file_details?.file_type);

      const processRes = await POST_METHOD(
        "gimmick/auraVoice/processVoice",
        { file_name: filename },
        true,
      );

      console.log("Process Voice Response:", processRes);
      setAuraData(processRes);
      setStep(2);
    } catch (error) {
      console.error("Error during voice upload or processing:", error);
      toast.error(
        "Something went wrong while processing your voice. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {hasPaid ? (
        <div className="min-h-screen bg-black flex justify-center items-center relative">
          <div className="absolute top-70 right-32 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-32 left-32 w-64 h-64 bg-yellow-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative h-full w-full max-w-lg flex flex-col items-center bg-[#18181b]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 min-h-[500px]">
            {/* Background ambient glow - Pink/Orange for "Aura" vibe */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center !p-8 sm:!p-10">
              {step === 1 ? (
                <div className="w-full flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                  {/* Header Badge */}
                  <div className="inline-flex items-center justify-center !px-4 !py-1.5 rounded-full bg-white/5 border border-white/10 !mb-6">
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse !mr-2" />
                    <span className="text-xs font-semibold tracking-wider text-white/70 uppercase">
                      Vocal Scan
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/95 !mb-3">
                    Discover Your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                      Aura
                    </span>
                  </h1>

                  {/* --- STATE 1: PROCESSING --- */}
                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center w-full !mt-8 animate-in zoom-in duration-500">
                      <div className="relative flex items-center justify-center !mb-6">
                        <div className="absolute inset-0 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
                        {/* If you still want your custom images, you can add them back here inside this relative wrapper */}
                        <Circles
                          height="80"
                          width="80"
                          color="#f472b6" // Tailwind pink-400
                          ariaLabel="processing-spinner"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white/90 !mb-2">
                        Analyzing Your Aura
                      </h3>
                      <p className="text-[15px] text-white/50 font-medium max-w-[250px]">
                        Your emotions are unique. Let’s discover yours.
                      </p>
                    </div>
                  ) : audioBlob ? (
                    /* --- STATE 2: AUDIO RECORDED --- */
                    <div className="w-full flex flex-col items-center animate-in fade-in duration-500 !mt-6">
                      <div className="w-full bg-white/5 border border-white/10 rounded-2xl !p-4 !mb-6 flex flex-col items-center shadow-inner">
                        <p className="text-sm font-semibold text-white/70 !mb-3">
                          Recording Captured
                        </p>

                        {/* HTML Audio Element (styled via container) */}
                        <audio
                          controls
                          src={URL.createObjectURL(audioBlob)}
                          className="w-full rounded-lg outline-none !mb-4 opacity-90"
                        />

                        <button
                          className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-200 !px-4 !py-2 rounded-lg hover:bg-red-500/10"
                          onClick={handleClearAudio}
                        >
                          Delete & Try Again
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* --- DEFAULT IMAGE FALLBACK (If used) --- */
                    !isRecording &&
                    image && (
                      <img
                        loading="lazy"
                        className="w-48 h-48 object-cover rounded-full border-4 border-white/10 shadow-2xl !mt-4 !mb-8"
                        src={image}
                        alt="Aura visual"
                      />
                    )
                  )}

                  {/* --- STATE 3: RECORDING IN PROGRESS --- */}
                  {isRecording ? (
                    <div className="flex flex-col items-center w-full !mt-8 animate-in fade-in duration-300">
                      <div className="flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-full !px-6 !py-3 !mb-8 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping !mr-3" />
                        <span className="text-red-400 font-bold tracking-wide">
                          Recording...
                        </span>
                      </div>

                      <button
                        className="group relative w-full sm:w-auto min-w-[200px] flex items-center justify-center bg-red-500/90 hover:bg-red-500 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-[0.97] !py-3.5 !px-6"
                        onClick={stopRecording}
                      >
                        Stop Recording
                      </button>
                    </div>
                  ) : !audioBlob && !isFileUploaded && !isProcessing ? (
                    /* --- STATE 4: READY TO RECORD (Initial State) --- */
                    <div className="flex flex-col items-center w-full !mt-4">
                      <p className="text-[15px] text-white/50 font-medium leading-relaxed !mb-8 max-w-[250px]">
                        Let’s analyze how you feel through the tone of your
                        voice.
                      </p>

                      {/* Big interactive Mic Button */}
                      <div
                        className="group relative flex flex-col items-center cursor-pointer"
                        onClick={startRecording}
                      >
                        <div className="absolute inset-0 bg-pink-500/0 rounded-full blur-xl group-hover:bg-pink-500/20 transition-all duration-500" />
                        <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:scale-105 group-hover:border-pink-400/50 transition-all duration-300 !mb-4">
                          {/* Fallback to text if mic icon fails, otherwise use your {mic} */}
                          <img
                            src={mic}
                            alt="Mic"
                            className="w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                          Tap to Start
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {/* --- PROCEED BUTTON --- */}
                  {audioBlob && !isProcessing && (
                    <button
                      className="group relative w-full sm:w-auto min-w-[240px] flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(236,72,153,0.4)] active:scale-[0.97] !py-4 !px-8 !mt-4"
                      onClick={handleProcessVoice}
                    >
                      <span className="relative z-10 flex items-center">
                        {!isFileUploaded ? "Analyze Voice" : "Continue"}
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
              ) : step === 2 ? (
                <Step2
                  auraData={auraData}
                  setStep={setStep}
                  setSuggestedActivity={setSuggestedActivity}
                />
              ) : step === 3 ? (
                <Step3
                  suggestedActivity={suggestedActivity}
                  setStep={setStep}
                />
              ) : step === 4 ? (
                <VoiceStep4
                  setStep={setStep}
                  setSuggestion={setSuggestedActivity}
                />
              ) : null}

              {/* --- DARK THEME MATERIAL UI MODAL --- */}
              <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "#18181b", // Matches tailwind zinc-900
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    p: 4,
                    borderRadius: 4,
                    width: "90%",
                    maxWidth: "400px", // Better than 80vh for standard alerts
                    textAlign: "center",
                    color: "white", // Fixes text color for dark background
                  }}
                >
                  <AccessModal />{" "}
                  {/* Ensure text inside this component is also white/light! */}
                  <Button
                    variant="contained"
                    sx={{
                      mt: 4,
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      borderRadius: 3,
                      textTransform: "none",
                      background: "linear-gradient(to right, #ec4899, #f97316)", // Matches our pink-to-orange tailwind gradient
                      boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #db2777, #ea580c)",
                        boxShadow: "0 6px 20px rgba(236, 72, 153, 0.5)",
                        transform: "translateY(-1px)",
                      },
                    }}
                    onClick={() => {
                      setShowModal(false);
                      try {
                        window.location.href =
                          "chrome://settings/content/camera";
                      } catch (err) {
                        console.warn("Could not navigate to settings:", err);
                      }
                    }}
                  >
                    Got it! 🎯
                  </Button>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      ) : (
        <Transaction setShowTransaction={setHasPaid} payData={payData} />
      )}
    </>
  );
}
