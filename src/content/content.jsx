import React, { createContext, useState } from "react";
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]); 
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            
        setRecentPrompt(prompt);
        }
        else{
        setPrevPrompt(prev => [...prev, input]);
        setRecentPrompt(input);
        response = await run(input);
        }
        let responseArray = response.split("**");
        console.log(response);
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += responseArray[i];
            }
        }
        let newResponse2 = newResponse.split("*").join(" ");
        let newresponseArray = newResponse2.split(" ");
        for (let i = 0; i < newresponseArray.length; i++) {
            const nextWord = newresponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setResultData(newResponse2);
        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompt, 
        setPrevPrompt,
        onSent,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setRecentPrompt,
        recentPrompt,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;




// why prompt is not displayed in the console? wai it dn't linked ok fine