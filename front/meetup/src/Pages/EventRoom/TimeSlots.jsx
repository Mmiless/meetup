import React, {useEffect} from "react";

const TimeSlots = ({isLoggedIn, allTimes, userSelectedTimes, setUserSelectedTimes, updateUserSelectedTimes}) => {

    const eventDetails = JSON.parse(localStorage.getItem('eventDetails'));
    const startTime = eventDetails.start_time;
    const endTime = eventDetails.end_time;
    const dates = eventDetails.dates;

    // Format time to show hours and minutes
    const formatTime = (timeValue) => {
        const hour = Math.floor(timeValue);
        const minutes = Math.round((timeValue - hour) * 60);
        
        const period = hour < 12 ? "AM" : "PM";
        const hourTwelve = hour % 12 === 0 ? 12 : hour % 12;
        
        return `${hourTwelve}:${minutes.toString().padStart(2, '0')} ${period}`;
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

    // Handle time click with support for 15-minute intervals
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

    // Process all times with 15-minute intervals
    const allTimesFormatted = {};
    if (allTimes && Array.isArray(allTimes) && allTimes.length > 0) {
        console.log("Processing allTimes:", allTimes);
        
        allTimes.forEach((userTimes) => {
          // Process each date for this user
          Object.entries(userTimes).forEach(([dateKey, timeSlots]) => {
            if (!allTimesFormatted[dateKey]) {
              allTimesFormatted[dateKey] = {};
            }
            Object.entries(timeSlots).forEach(([timeSlot, isAvailable]) => {
              if (isAvailable) {
                const timeNum = parseFloat(timeSlot);
                
                if (!allTimesFormatted[dateKey][timeNum]) {
                  allTimesFormatted[dateKey][timeNum] = 0;
                }
                allTimesFormatted[dateKey][timeNum] += 1;
              }
            });
          });
        });
      }

    const getCellColor = (count) => {
        const participants = allTimes.length;
        console.log(participants);
        console.log(allTimes);
        if (!count || (count / participants === 0)) return "bg-gray-200"; // empty cell (no attendants)
        else if ((count / participants) <=  0.25) return "bg-green-200";
        else if ((count / participants) <=  0.5) return "bg-green-400";
        else if ((count / participants) <=  0.75) return "bg-green-600";
        return "bg-green-800";
    };
    
    // Generate time intervals - 4 slots per hour (15 min each)
    const generateTimeIntervals = () => {
        const intervals = [];
        for (let hour = startTime; hour < endTime; hour++) {
            intervals.push(hour);
            intervals.push(hour + 0.25);
            intervals.push(hour + 0.5);
            intervals.push(hour + 0.75);
        }
        intervals.push(endTime);
        return intervals;
    };

    const timeIntervals = generateTimeIntervals();
    
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
                                    className={`w-20 h-8 border ${!isLoggedIn ? "bg-zinc-400" : getCellColor(count)}`}
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