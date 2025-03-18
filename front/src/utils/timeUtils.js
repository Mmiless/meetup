export const formatTime = (timeValue) => {
    const hour = Math.floor(timeValue);
    const minutes = Math.round((timeValue - hour) * 60);
    
    const period = hour < 12 ? "AM" : "PM";
    const hourTwelve = hour % 12 === 0 ? 12 : hour % 12;
    
    return `${hourTwelve}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const formatDate = (day) => {
    const ymd = day.split('-');
    return ymd[1] + "/" + ymd[2];
};
  

export const generateTimeIntervals = (startTime, endTime) => {
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
  

export const getCellColor = (count, totalParticipants) => {
    if (!count || totalParticipants === 0 || (count / totalParticipants === 0)) {
        return "bg-gray-200"; // empty cell (no attendants)
    } else if ((count / totalParticipants) <= 0.25) {
        return "bg-green-200";
    } else if ((count / totalParticipants) <= 0.5) {
        return "bg-green-400";
    } else if ((count / totalParticipants) <= 0.75) {
        return "bg-green-600";
    }
    return "bg-green-800";
};
  
 
export const processAllTimes = (allTimes) => {
    const allTimesFormatted = {};

    if (allTimes && Array.isArray(allTimes) && allTimes.length > 0) {
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

    return allTimesFormatted;
};