import React, {useState} from "react";
import "./Time.css";

const Time = ({startTime, setStartTime, endTime, setEndTime}) => {

    const times = Array.from({length: 24}, (_, i) => i);
    const [startTimeIndex, setStartTimeIndex] = useState(0);

    const handleStartChange = (e) =>{
        const selection = parseInt(e.target.value);
        setStartTimeIndex(selection);
        setStartTime(selection)

        if (endTime <= selection) {
            setEndTime(selection + 1);
        }
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
            <select className="select" id="start" onChange={handleStartChange}>
                {times.map((hour) => (
                    <option key={hour} value={hour}>
                        {formatTime(hour)}
                    </option>
                ))}
            </select>
            <label htmlFor="end" >Latest: </label>
            <select className = "select" id="end" onChange={handleEndChange}>
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

