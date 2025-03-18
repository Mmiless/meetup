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

    const formatTime = (time) => {
        const period = time < 12 ? "AM" : "PM";
        const timeTwelve = time % 12 === 0 ? 12 : time % 12; 
        return `${timeTwelve}:00 ${period}`;
    };

    return (
        <div className="flex flex-col">
            <div className="font-semibold mb-2" id="promptText">What times?</div>
            <div className="flex items-center space-x-4">
                <div className="flex flex-col space-y-4">
                    <label htmlFor="start">Earliest:</label>
                    <label htmlFor="end">Latest:</label>
                </div>
                <div className="flex flex-col space-y-4">
                    <select className="border border-gray-300 rounded-lg p-1" id="start" onChange={handleStartChange}>
                        {times.map((time) => (
                            <option key={time} value={time}>
                                {formatTime(time)}
                            </option>
                        ))}
                    </select>
                    <select className="border border-gray-300 rounded-lg p-1" id="end" onChange={handleEndChange}>
                        {times.filter((time) => time > startTimeIndex).map((time) => (
                                <option key={time} value={time}>
                                    {formatTime(time)}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
        </div>
    );
    
};

export default Time;

