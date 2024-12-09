import React, {useState} from "react";

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
        <div className="flex flex-col">
            <div className="font-semibold" id="promptText">What times?</div>
            <div className="p-1">
                <label htmlFor="start" >Earliest: </label>
                <select className="border border-gray-300 rounded-lg p-1" id="start" onChange={handleStartChange}>
                    {times.map((hour) => (
                        <option key={hour} value={hour}>
                            {formatTime(hour)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="end" >Latest: </label>
                <select className="border border-gray-300 rounded-lg p-1" id="end" onChange={handleEndChange}>
                    {times.filter((hour) => hour > startTimeIndex).map((hour) => (
                        <option key={hour} value={hour}>
                            {formatTime(hour)}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Time;

