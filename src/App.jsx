import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AuraSnap from "./components/snap/AuraSnap.jsx";
import TextAnalysis from "./components/textAnalysis/TextAnalysis.jsx";
import AuraVoice from "./components/audio/voice.jsx";

import YourSelf from "./pages/home";
const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<YourSelf />} />
      <Route path="/gimmick/text-analysis" element={<TextAnalysis />} />
      <Route path="/gimmick/snap" element={<AuraSnap />} />
      <Route path="/gimmick/voice" element={<AuraVoice />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
