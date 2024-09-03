"use client";
import React, { useState, useEffect } from "react";
import { FcClock } from "react-icons/fc";
import moment from "moment";

const DateTimeCard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="h-56 w-56 shrink-0 place-content-center rounded border text-3xl border-neutral-500 bg-neutral-500/20
   
     flex-col
    justify-center items-center flex cursor-pointer"
    >
      <FcClock size={50} />
      <h2 className="text-2xl font-semibold mb-2 text-center text-white">
        {currentTime.format("dddd")}
      </h2>
      <p className="text-xl mb-2 text-white">
        {currentTime.format("MMMM D, YYYY")}
      </p>
      <div className="text-3xl font-mono">
        {currentTime.format("hh:mm:ss A")}
      </div>
    </div>
  );
};

export default DateTimeCard;
