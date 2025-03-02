import React, {useEffect} from "react";

const TimeSlots = ({isLoggedIn, allTimes, userSelectedTimes, setUserSelectedTimes, updateUserSelectedTimes}) => {

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
                updateUserSelectedTimes();
            }, 1000);

        return () =>  clearTimeout(serverUpdate);
    }, [userSelectedTimes, isLoggedIn]);

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

    const allTimesFormatted = {};
    if (allTimes && Array.isArray(allTimes)) {
      allTimes.forEach((entry) => {
        Object.entries(entry).forEach(([dateKey, times]) => {
          if (!allTimesFormatted[dateKey]) {
            allTimesFormatted[dateKey] = {};
          }
          Object.entries(times).forEach(([hour, available]) => {
            if (available) {
              allTimesFormatted[dateKey][hour] =
                (allTimesFormatted[dateKey][hour] || 0) + 1;
            }
          });
        });
      });
    }

    const getCellColor = (count) => {
        const participants = Object.keys(allTimes).length;
        if (!count || (count / participants === 0)) return "bg-gray-200"; // empty cell (no attendants)
        else if ((count / participants) <=  0.25) return "bg-green-200";
        else if ((count / participants) <=  0.5) return "bg-green-400";
        else if ((count / participants) <=  0.75) return "bg-green-600";
        return "bg-green-800";
      };
    
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
                {Array.from({ length: endTime - startTime }).map((_, hourIdx) => {
                    const hour = startTime + hourIdx;
                    return (
                    <div key={hourIdx} className="flex flex-row gap-x-1">
                        <div className="w-20 h-11 flex items-center justify-center font-source-code font-bold px-2 whitespace-nowrap mr-2">
                            {formatTime(hour)}
                        </div>
                            {dates.map((day, dayIdx) => {
                            const count =
                                allTimesFormatted[day] && allTimesFormatted[day][hour]
                                ? allTimesFormatted[day][hour]
                                : 0;
                            return (
                                <div
                                key={dayIdx}
                                className={`w-20 h-11 border ${!isLoggedIn ? "bg-zinc-400" : getCellColor(count)}`}
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