import React, {useState, useEffect} from "react";

const TimeSlots = () => {

    const [selectedTimes, setSelectedTimes] = useState({});

    const eventDetails = JSON.parse(localStorage.getItem('eventDetails'));
    const startTime = eventDetails.start_time;
    const endTime = eventDetails.end_time;
    const dates = eventDetails.dates;

    const formatTime = (hour) => {
        const period = hour < 12 ? "AM" : "PM";
        const hourTwelve = hour % 12 === 0 ? 12 : hour % 12; 
        return `${hourTwelve}:00 ${period}`;
    };

    const formatDate = (day) => {
        const ymd = day.split('-');
        return ymd[1] + "/" + ymd[2];
    }
    
    const handleTimeClick = (day, time) => {
        setSelectedTimes((prevState) =>{
            const daySlots = prevState[day] || {};
            return {
                ...prevState,
                [day]:{
                    ...daySlots,
                    [time]: !daySlots[time]
                }
            }
        })
    };

    // For logging times
    React.useEffect(() => {
        console.log(selectedTimes);
    }, [selectedTimes]);
    
    return (
        <div className="select-none flex flex-col space-y-1">
            <div className="flex flex-row gap-x-1">
                <div className="w-20"></div>
                {dates.map((day, dayIdx) => (
                    <div key={dayIdx} className="w-20 text-center font-source-code font-bold">
                        {formatDate(day)}
                    </div>
                ))}
            </div>
    
            {Array.from({ length: endTime - startTime }).map((_, hourIdx) => {
                const hour = startTime + hourIdx;
                return (
                    <div key={hourIdx} className="flex flex-row gap-x-1">
                        <div className="w-20 h-11 flex items-center justify-center font-source-code font-bold px-2">{formatTime(hour)}</div>
                        {dates.map((day, dayIdx) => {
                            const isSelected = selectedTimes[day]?.[hour];
                            return (
                                <div
                                    key={dayIdx}
                                    className={`w-20 h-11 border cursor-pointer ${
                                        isSelected ? "bg-green-500" : "bg-gray-200"
                                    }`}
                                    onMouseDown={() => handleTimeClick(day, hour)}
                                    onMouseOver={(e) => {
                                        if (e.buttons === 1) handleTimeClick(day, hour); // Select while dragging
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default TimeSlots;