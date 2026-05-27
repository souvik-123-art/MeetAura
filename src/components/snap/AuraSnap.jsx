import React, { useContext, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

import styles from "./mystyle.module.css";
import { Circles } from "react-loader-spinner";

import snap from "./assets/snap.webp";
import Cam from "./assets/cam (2).png";
import Transaction from "../transactions/Transactions";
import { GET_METHOD, POST_METHOD } from "../../config/index";

import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import AccessModal from "../accessModal";

export default function Index() {
  const [step, setStep] = useState(1);
  const [suggesttion, setSuggestion] = useState("");
  const [isCamera, setIsCamera] = useState(false);
  // console.log(step)
  const webcamRef = useRef(null);
  const [selfie, setSelfie] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [suggestedActivity, setSuggestedActivity] = useState(null);

  const [hasPaid, setHasPaid] = useState(false); // null = loading
  const [payData, setPayData] = useState({});
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   GET_METHOD(`gimmick/transaction/pointsStatus?gimmick_id=1`, true)
  //     .then((data) => {
  //       console.log("Whether User has paid : ", data.transaction);
  //       setHasPaid(data.transaction);
  //       // setHasPaid(false);
  //       setPayData(data);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch transaction status", err);
  //       toast.error(
  //         "Failed to fetch your transaction status. Please try again.",
  //       );
  //       setHasPaid(false);
  //     });
  // }, []);

  // if (hasPaid === null) return <div className="tamBody"><h3>Loading...</h3></div>;
  // if (!hasPaid) return <Transaction setShowTransaction={setHasPaid} />;

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

  // const [text, setText] = useState("");
  // const [url,setUrl] = useState(`${import.meta.env.VITE_BACKEND_URL}/gimmick/textAnalysis/getMedia?id=`+getRandomNumber());

  const captureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setSelfie(imageSrc);
    setIsCamera(false);
    setIsFileUploaded(true);
  };

  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64.split(",")[1]); // Remove metadata
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    return new Blob([new Uint8Array(byteArrays)], { type: "image/png" }); // Change type if needed
  };

  const handleProcessSnap = async () => {
    setIsFileUploaded(true);
    setLoading(true);

    console.log("STARTED");
    const formData = new FormData();
    // console.log(formData)
    formData.append("snap", base64ToBlob(selfie), "snap.png");
    // console.log(formData)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/gimmick/aura/uploadSnap`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI5NzQ4MDkxLCJleHAiOjE3Mjk3NTE2OTF9.Hz_ghfDb3yMhxMwvAYDOYbFkSuU9J6faP3g8r-sBxQU",
          },
        },
      );

      console.log("Selfie Uploaded Successfully");
      const filename = res.data.file_details.file_name;
      console.log(filename);
      Promise.resolve(
        POST_METHOD(
          "gimmick/aura/processSnap",
          {
            snap_id: filename,
          },
          true,
        ),
      )
        .then((data) => {
          console.log(data);
          setAuraData(data);
          setStep(2);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error processing the snap. Please try again");
          setIsCamera(false);
          setIsFileUploaded(false);
        })
        .finally(() => {
          setLoading(false);
        });
      // setImageId(res?.data?.file_details?.file_name)
      // if (res?.data?.file_details?.file_type == "image/*") {
      //   // setPostType(1)
      // }
    } catch (error) {
      console.error("Error uploading ID proof:", error);
      toast.error("Failed to upload the image. Please check your connection.");
      setLoading(false);
      // handleToast(0, "Failed to upload ID proof.");
      return null;
    }
  };

  // if (loading) {
  //   return (
  //     <div className={styles.textAnalysisMain}>
  //       <div className={styles.tamBody}>
  //         <h3>Processing your selfie...</h3>
  //         <Circles
  //           height="80"
  //           width="80"
  //           color="#FF7373"
  //           ariaLabel="loading-circle"
  //         />
  //         <p>Please wait while we analyze your aura.</p>
  //         {/* Optionally insert a loading spinner image or animation here */}
  //       </div>
  //     </div>
  //   );
  // }
  const handleCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => {
        setIsCamera(true);
      })
      .catch((err) => {
        console.error(err);
        setShowModal(true);
      });
  };

  return hasPaid ? (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] text-white !p-4">
      <div
        className={`relative w-full flex flex-col items-center bg-[#18181b]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 ${isCamera && !loading ? "min-h-[800px] max-w-2xl" : "min-h-[500px] max-w-lg"}`}
      >
        {/* Ambient Glows */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* --- DYNAMIC CONTENT RENDERING --- */}
        {loading ? (
          /* --- PREMIUM DARK MODE LOADING STATE --- */
          <div className="relative z-10 w-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700 min-h-[400px] sm:min-h-[500px] !p-6 text-center">
            {/* Glowing Loader Wrapper - Centered at the top */}
            <div className="relative flex items-center justify-center !mb-6">
              {/* Subtle ambient glow specifically behind the spinner */}
              <div className="absolute inset-0 bg-[#c084fc]/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative z-10">
                <Circles
                  height="70"
                  width="70"
                  color="#c084fc" // Matches the soft purple in your second image
                  ariaLabel="loading-circle"
                />
              </div>
            </div>

            {/* Text Stack */}
            <div className="flex flex-col items-center !space-y-3">
              {/* Title with purple/lavender gradient */}
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#e879f9]">
                Processing your selfie...
              </h3>

              {/* Subtitle in soft gray */}
              <p className="text-[14px] text-gray-400 font-medium animate-pulse">
                Please wait while we analyze your aura
              </p>
            </div>
          </div>
        ) : step == 1 ? (
          /* --- STEP 1: CAMERA UI --- */
          <div className="relative z-10 w-full flex flex-col items-center !p-8 sm:!p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out text-center">
            {/* Header Badge */}
            <div className="inline-flex items-center justify-center !px-4 !py-1.5 rounded-full bg-white/5 border border-white/10 !mb-6">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse !mr-2" />
              <span className="text-xs font-semibold tracking-wider text-white/70 uppercase">
                Visual Scan
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/95 !mb-8">
              Discover Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                Aura
              </span>{" "}
              Today
            </h3>

            {/* --- CAMERA / IMAGE DISPLAY AREA --- */}
            <div
              className={`relative w-full ${isCamera ? "" : "aspect-[4/3] max-w-[320px]"} transition-all duration-500 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 flex flex-col items-center justify-center !mb-8 group`}
            >
              {isCamera ? (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "user" }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : selfie ? (
                <img
                  loading="lazy"
                  src={selfie}
                  alt="Selfie"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  src={snap}
                  alt="Illustration"
                />
              )}

              {/* Subtle inner shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* --- ACTION BUTTONS --- */}
            {isCamera ? (
              <button
                onClick={captureSelfie}
                className="group relative w-full sm:w-auto min-w-[240px] flex items-center justify-center bg-white text-black font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.3)] active:scale-[0.97] !py-3.5 !px-6"
              >
                <span className="relative z-10 flex items-center">
                  📸 Capture Selfie
                </span>
              </button>
            ) : !isFileUploaded ? (
              <div className="flex flex-col items-center w-full">
                <p className="text-[15px] text-white/50 font-medium max-w-sm leading-relaxed !mb-6">
                  Let’s analyze how you feel through thoughtful imagery.
                </p>

                <button
                  onClick={handleCamera}
                  className="group relative w-full sm:w-auto min-w-[240px] flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.97] !py-3 !px-6"
                >
                  <span className="flex items-center gap-3">
                    Start by taking a selfie
                    <img
                      loading="lazy"
                      className="h-6 w-6 opacity-80 group-hover:opacity-100 transition-opacity"
                      src={Cam}
                      alt="Camera"
                    />
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full !space-y-4">
                <button
                  onClick={() => handleProcessSnap()}
                  className="group relative w-full sm:w-auto min-w-[240px] flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-400 hover:to-orange-300 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.4)] active:scale-[0.97] !py-4 !px-8"
                >
                  <span className="relative z-10 flex items-center">
                    Analyze Aura
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

                <button
                  onClick={handleCamera}
                  className="text-sm font-medium text-white/50 hover:text-white transition-colors"
                >
                  Retake Selfie
                </button>
              </div>
            )}
          </div>
        ) : step == 2 ? (
          <Step2
            auraData={auraData}
            setStep={setStep}
            setSuggestedActivity={setSuggestedActivity}
          />
        ) : step == 3 ? (
          <Step3 suggestedActivity={suggestedActivity} setStep={setStep} />
        ) : (
          <Step4 setStep={setStep} setAuraData={setAuraData} />
        )}

        {/* --- DARK THEME MATERIAL UI MODAL --- */}
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#18181b",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              p: 4,
              borderRadius: 4,
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
              color: "white",
            }}
          >
            <AccessModal />
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: 3,
                textTransform: "none",
                background: "linear-gradient(to right, #ec4899, #f97316)",
                boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)",
                "&:hover": {
                  background: "linear-gradient(to right, #db2777, #ea580c)",
                  boxShadow: "0 6px 20px rgba(236, 72, 153, 0.5)",
                  transform: "translateY(-1px)",
                },
              }}
              onClick={() => {
                setShowModal(false);
                try {
                  window.location.href = "chrome://settings/content/camera";
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
  ) : (
    <Transaction setShowTransaction={setHasPaid} payData={payData} />
  );
}
