import React, {useState} from "react";
import "./Time.css";

const Time = ({setStartTime, setEndTime}) => {

    const times = Array.from({length: 24}, (_, i) => i);
    const [startTimeIndex, setStartTimeIndex] = useState(0);

    const handleStartChange = (e) =>{
        const selection = parseInt(e.target.value);
        setStartTimeIndex(selection);
        setStartTime(selection)
    }

    const handleEndChange = (e) =>{
        const selection = parseInt(e.target.value);
        setEndTime(selection);
    }

    const formatTime = (hour) => {
        const period = hour < 12 ? "AM" : "PM";
        const hourTwelve = hour % 12 === 0 ? 12 : hour % 12; 
        return `${hourTwelve}:00 ${period}`;
    };

    return(
        <div className="timeContainer">
                <div id="promptText">What times?</div>
                <label htmlFor="start" >Earliest: </label>
                <select id="start" onChange={handleStartChange}>
                    {times.map((hour) => (
                        <option key={hour} value={hour}>
                            {formatTime(hour)}
                        </option>
                    ))}
                </select>
                <label htmlFor="end" onChange={handleEndChange}>Latest: </label>
                <select id="end">
                    {times.filter((hour) => hour > startTimeIndex).map((hour) => (
                        <option key={hour} value={hour}>
                            {formatTime(hour)}
                        </option>
                    ))}
                </select>
            </div>
    );
};

export default Time;

