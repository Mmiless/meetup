import React, { useEffect, useMemo } from "react";
import { 
  formatTime, 
  formatDate, 
  generateTimeIntervals, 
  getCellColor, 
  processAllTimes 
} from "../../utils/timeUtils";

const TimeSlots = ({isLoggedIn, allTimes, userSelectedTimes, setUserSelectedTimes, updateUserSelectedTimes}) => {
    const eventDetails = JSON.parse(localStorage.getItem('eventDetails'));
    const startTime = eventDetails.start_time;
    const endTime = eventDetails.end_time;
    const dates = eventDetails.dates;

    useEffect(() => {
        if (!isLoggedIn) return;
        
        const serverUpdate = setTimeout(async () => {
                updateUserSelectedTimes();
            }, 1000);

        return () => clearTimeout(serverUpdate);
    }, [userSelectedTimes, isLoggedIn, updateUserSelectedTimes]);

    const handleTimeClick = (day, time) => {
        if(!isLoggedIn) return;
        setUserSelectedTimes((prevState) => {
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

    // allow own allTimes table to update immediately upon input
    const mergedAllTimes = useMemo(() => {
        if (!isLoggedIn || !allTimes) {
            return allTimes || [];
        }
        const updatedAllTimes = [...(Array.isArray(allTimes) ? allTimes : [])];
        
        updatedAllTimes.push(userSelectedTimes);
        
        return updatedAllTimes;
    }, [allTimes, userSelectedTimes, isLoggedIn]);

    const allTimesFormatted = processAllTimes(mergedAllTimes);
    
    const timeIntervals = generateTimeIntervals(startTime, endTime);
    
    return (
        <div className="flex flex-col space-y-2">
            <div className="select-none flex flex-col space-y-1 border border-gray-300 p-4 max-w-[1000px] overflow-x-scroll">
                <div className="flex flex-row gap-x-1">
                    <div className="w-20"></div>
                    {dates.map((day, dayIdx) => (
                        <div key={dayIdx} className="w-20 text-center font-source-code font-bold">
                            {formatDate(day)}
                        </div>
                    ))}
                </div>
        
                {timeIntervals.map((time, timeIdx) => {
                    return (
                        <div key={timeIdx} className="flex flex-row gap-x-1">
                            <div className="w-20 h-8 flex items-center justify-center font-source-code font-bold px-2 whitespace-nowrap mr-2">
                                {formatTime(time)}
                            </div>
                            {dates.map((day, dayIdx) => {
                                const isSelected = userSelectedTimes[day]?.[time];
                                return (
                                    <div
                                        key={dayIdx}
                                        className={`w-20 h-8 border cursor-pointer ${
                                            !isLoggedIn ? "bg-zinc-400" :
                                            isSelected ? "bg-green-500" : "bg-gray-200"
                                        }`}
                                        onMouseDown={() => handleTimeClick(day, time)}
                                        onMouseOver={(e) => {
                                            if (e.buttons === 1) handleTimeClick(day, time); // Select while dragging
                                        }}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            <div className="border border-gray-300 p-4 max-w-[1000px] overflow-x-scroll">
                <div className="select-none flex flex-col space-y-1">
                <div className="flex flex-row gap-x-1">
                    <div className="w-20"></div>
                    {dates.map((day, dayIdx) => (
                    <div
                        key={dayIdx}
                        className="w-20 text-center font-source-code font-bold"
                    >
                        {formatDate(day)}
                    </div>
                    ))}
                </div>
                {timeIntervals.map((time, timeIdx) => {
                    return (
                        <div key={timeIdx} className="flex flex-row gap-x-1">
                            <div className="w-20 h-8 flex items-center justify-center font-source-code font-bold px-2 whitespace-nowrap mr-2">
                                {formatTime(time)}
                            </div>
                            {dates.map((day, dayIdx) => {
                                const count =
                                    allTimesFormatted[day] && allTimesFormatted[day][time]
                                    ? allTimesFormatted[day][time]
                                    : 0;
                                return (
                                    <div
                                    key={dayIdx}
                                    className={`w-20 h-8 border ${!isLoggedIn ? "bg-zinc-400" : getCellColor(count, allTimes.length)}`}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
                </div>
            </div>
        </div>
    );
};

export default TimeSlots;