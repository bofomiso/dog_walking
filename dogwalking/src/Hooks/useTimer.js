import React, { useState, useRef } from "react";

const useTimer = () => {
    const [time, setTime] = useState(0);
    const [StopwatchStart, setStopwatchStart] = useState(false); //start stopwatch
    const [StopwatchReset, setStopwatchReset] = useState(false); //reset stopwatch
    const countRef = useRef(null);

    const handleStart = () => {
        setStopwatchStart(true);
        countRef.current = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000)
        //console.log(time);
    }

    const handlePause = () => {
        clearInterval(countRef.current);
        setStopwatchStart(false);
    }

    const handleResume = () => {
        setStopwatchStart(true);
        countRef.current = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000)
    }

    const handleReset = () => {
        clearInterval(countRef.current);
        setStopwatchReset(true);
        setTime(0);
    }
    
    return { time, StopwatchStart, StopwatchReset, handleStart, handlePause, handleReset, handleResume }
}

export default useTimer