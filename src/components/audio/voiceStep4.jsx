import React, { useContext, useEffect, useState } from "react";
import "./voice.css";

import { GET_METHOD } from "../../config/index";

export default function Index({ setStep, setSuggestion }) {
  // const [step, setStep] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.resolve(GET_METHOD("gimmick/auraVoice/history", true))
      .then((data) => {
        setData(data.history);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("shaquib");
  }, []);

  console.log(data);

  return (
    <div >
      <div className={"tamBody"}>
        <h3 className="textAnalysisHeading">Track Your Growth</h3>
        <p className="textAnalysisPara">See how your thoughts and emotions evolve over time</p>
        {Array.isArray(data) &&
          data.map((element, index) => {
            return (
              <div className={"textAnalysisHistoryCard"} key={index} onClick={() => {
                setSuggestion(element);
                console.log({
                  aura: element
                })
                setStep(2);
              }}
              style={{cursor:"pointer"}}
              >
                <h3>{element.date}</h3>
                <p>{element.aura_emotion}</p>
                {/* <img
                  className="textAnalysisStep2Img"
                  src={element.aura_icon}
                  alt=""
                /> */}
                <span

                >
                  Read More
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
