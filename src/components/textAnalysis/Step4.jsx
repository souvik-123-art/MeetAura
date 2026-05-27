import React, { useContext, useEffect, useState } from "react";
import styles from './mystyle.module.css'


import { GET_METHOD } from "../../config/index";




export default function Index({ setStep, setSuggestion }) {

    // const [step, setStep] = useState(1);
    const [data, setData] = useState([]);



    useEffect(() => {
        Promise.resolve(GET_METHOD("gimmick/textAnalysis/history", true))
            .then(data => {
                setData(data);
            })
            .catch(err => {
                console.log(err);
            })
        console.log("vinay")
    },[])


    return (
        <div className={styles.textAnalysisMain}>
            <div className={styles.tamBody}>
                <h3>Track Your Growth</h3>
                <p>See how your thoughts and emotions evolve over time</p>
                {
                    data.map(element => {
                        return (
                            <div className={styles.textAnalysisHistoryCard}>
                                <h3>{element.date}</h3>
                                <p>{element.feedback}</p>
                                <span onClick={()=>{setSuggestion(element.feedback);setStep(3)}}>Read More</span>
                            
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}
