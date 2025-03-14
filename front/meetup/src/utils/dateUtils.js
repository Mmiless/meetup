function getEndDate(month, year){
    const days = new Map([["1", 31], ["2", 28], ["3", 31], ["4", 30], ["5", 31], ["6", 30], 
                            ["7", 31], ["8", 31], ["9", 30], ["10", 31], ["11", 30], ["12", 31]]);
    if(month === 2 && (year % 4 === 0)) return 29;
    else return days.get(month.toString());
};

export const fillMatrix = () => {
    const date = new Date();
    const endDate = getEndDate(date.getMonth() + 1, date.getYear());
    const nextYr = date.getMonth() === 12 ? date.getMonth() + 1 : date.getMonth();
    const nextEndDate = getEndDate((date.getMonth() % 12) + 1, nextYr);

    let dayCount = date.getDate();
    let nextMonthDayCount = 1;
    let extraDayCount = 1; 
    const month = [];

    for(let r = 0; r < 5; r++){
        const week = [];
        for(let c = 0; c < 7; c++){
            if(dayCount <= endDate) week.push(dayCount++);
            else if (nextMonthDayCount <= nextEndDate) week.push(nextMonthDayCount++);
            else week.push(extraDayCount++);
        }
        month.push(week);
    }
    return month;
};

export const getDateFromIndices = (rowIdx, colIdx, startDate) => {
    const date = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
    date.setUTCDate(date.getUTCDate() + (rowIdx * 7) + colIdx);

    // Format as a date string in "YYYY-MM-DD" format
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`; 
};