import React, { useContext, useEffect, useState } from "react";
import styles from './mystyle.module.css'
import { GET_METHOD } from "../../config/index";

import { XAxis, YAxis, Tooltip, CartesianGrid, ScatterChart, Scatter, Legend } from 'recharts';



// import textAnalysisFinal from "./assets/textAnalysisFinal.png"




export default function Index({ setStep, setAuraData }) {

    // const [step, setStep] = useState(1);

    const [historyData, setHistoryData] = useState({});

    const days = {
        "Wed": 3,
        "Sat": 6,
        "Fri": 5,
        "Thurs": 4,
        "Sun": 7,
        "Mon": 1,
        "Tues": 2,
    }


    useEffect(() => {
        Promise.resolve(GET_METHOD("gimmick/aura/history", true))
            .then(data => {
                console.log(data);
                setHistoryData(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])



    return (
        <div >
            <div className={styles.snapGraph}>
                <ScatterChart
                    width={400}
                    height={300}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid />
                    <XAxis type="category" dataKey="x" name="Days of Week" />
                    <YAxis type="number" dataKey="y" name="Emotions ( 1 less positive 7 more positive)" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name={historyData?.desc} data={historyData.ploting_data ? historyData.ploting_data.map(ele => {
                        return {
                            // x: days[ele.x],
                            x: ele.x,
                            y: ele.y
                        }
                    }) : []} fill="#A305FF" />
                </ScatterChart>
            </div>
                    
            <div className={styles.snapHistory}>
            <h2>History</h2>
                {
                    historyData?.history?.map(element => {
                        return (
                            <div className={styles.textAnalysisHistoryCard} style={{cursor:"pointer"}} onClick={()=>{
                                
                                console.log(element)
                                setAuraData({aura : element});
                                setStep(2)
                                
                            }}>
                                <h3>{element.date}</h3>
                                <p>{element.aura_emotion}</p>
                                <span >Read More</span>

                            </div>
                        )
                    })
                }
            </div>



        </div>
    )
}
