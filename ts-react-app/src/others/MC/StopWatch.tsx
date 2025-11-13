import {useEffect, useRef, useState } from "react";
import "../styles/StopWatch.css"
const StopWatchComponent = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current=null;
    }
  };
useEffect(()=>{

    return()=>{
        if(timerRef.current)clearInterval(timerRef.current)
    }
},[])

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return (
    <div className="container">
      <p>Stop Waatch</p>
      <p>
        Timer::{minutes}:{seconds}
      </p>
      <div>
        <button className="btn" onClick={ handleStart}>start</button>
        <button className="btn" onClick={ handlePause}>pause</button>
        <button className="btn" onClick={ handleReset}>Reset</button>
      </div>
    </div>
  );
};
export default StopWatchComponent;
