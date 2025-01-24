import React, {useEffect} from "react";

const TimeSlots = ({isLoggedIn, userSelectedTimes, setUserSelectedTimes, updateUserSelectedTimes}) => {

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
    };

    useEffect(() => {
        if (!isLoggedIn) return;
        
        const serverUpdate = setTimeout(async () => {
                updateUserSelectedTimes()
            }, 1000);

        return () =>  clearTimeout(serverUpdate);
    }, [userSelectedTimes, isLoggedIn]);

    const handleTimeClick = (day, time) => {
        if(!isLoggedIn) return;
        setUserSelectedTimes((prevState) =>{
            const daySlots = prevState[day] || {};
            const newState = {
                ...prevState,
                [day]:{
                    ...daySlots,
                    [time]: !daySlots[time]
                }
            };
            return newState;
        });
    };
    
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
                        <div className="w-20 h-11 flex items-center justify-center font-source-code font-bold px-2 whitespace-nowrap mr-2">{formatTime(hour)}</div>
                        {dates.map((day, dayIdx) => {
                            const isSelected = userSelectedTimes[day]?.[hour];
                            return (
                                <div
                                    key={dayIdx}
                                    className={`w-20 h-11 border cursor-pointer ${
                                        !isLoggedIn ? "bg-zinc-400" :
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
};

export default TimeSlots;