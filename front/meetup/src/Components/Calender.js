import React, { useState } from "react";
import "./Calender.css";

function getEndDate(month, year){
    const days = new Map([["1", 31], ["2", 28], ["3", 31], ["4", 30], ["5", 31], ["6", 30], 
                            ["7", 31], ["8", 31], ["9", 30], ["10", 31], ["11", 30], ["12", 31]]);
    if(month === 2 && (year % 4 === 0)) return 29;
    else return days.get(month.toString());
}

function fillMatrix(){
    const date = new Date();
    const endDate = getEndDate(date.getMonth() + 1, date.getYear());
    const nextYr = date.getMonth() === 12 ? date.getMonth() + 1 : date.getMonth();
    const nextEndDate = getEndDate((date.getMonth() % 12) + 1, nextYr);

    let dayCount = date.getDate();
    let nextMonthDayCount = 1;
    let extraDayCount = 1; // 
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
}

const Calender = () => {

    const matrix = fillMatrix();

    const [selectedDates, setSelectedDates] = useState(
        Array.from({ length: 5 }, () => Array(7).fill(false))
    );

    const handleDateClick = (rowIdx, colIdx) => {
        setSelectedDates(prevState => {
            const newState = prevState.map(row => row.slice());
            newState[rowIdx][colIdx] = !newState[rowIdx][colIdx];
            return newState;
        });
    }

    const [selectedTimes, setSelectedTime] = useState(
        Array.from({length: 2}, () => Array(24).fill(false))
    );

    const times = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <div className ="pageContainer"> 

            <div className="calenderContainer">
                <div id="promptText">What dates?</div>
                    {matrix.map((row, rowIdx) => (
                    <div className="calendarRow" key={rowIdx}>
                        {row.map((cell, colIdx) => (
                            <button className="calendarButton" key={colIdx}
                                onClick={() => handleDateClick(rowIdx, colIdx)}
                                style={{
                                    backgroundColor: selectedDates[rowIdx][colIdx] ? "black" : "#ebeaed",
                                    color: selectedDates[rowIdx][colIdx] ? "#ebeaed" : "black"
                                }}>
                                {cell}
                            </button>
                        ))}
                </div>
                ))}
            </div>

            <div className="timeContainer">
                <div id="promptText">What times?</div>
                <label for="start" >Earliest: </label>
                <select id="start">
                    {times.map((hour) => (
                        <option key={hour}>
                            {hour}:00 AM
                        </option>
                    ))}
                    {times.map((hour) => (
                        <option key={hour}>
                            {hour}:00 PM
                        </option>
                    ))}
                </select>
                <label for="end" >Latest: </label>
                <select id="end">
                    {times.map((hour) => (
                        <option key={hour}>
                            {hour}:00 AM
                        </option>
                    ))}
                    {times.map((hour) => (
                        <option key={hour}>
                            {hour}:00 PM
                        </option>
                    ))}
                </select>
                    
            </div>

        </div>
    );    
};

export default Calender