import React, { useState } from "react";
import "./Calender.css";

const Calender = () => {

    // change logic to fill out correct dates
    const matrix = Array.from({ length: 5 }, (_, rowIndex) => 
        Array.from({ length: 7 }, (_, colIndex) => (rowIndex * 7 + colIndex + 1))
    );

    const [selectedDates, setSelectedDates] = useState(
        Array.from({ length: 5 }, () => Array(7).fill(false))
    );

    const handleDateClick = (rowIdx, colIdx) => {
        setSelectedDates(prevState => {
            const newState = prevState.map(row => row.slice());
            newState[rowIdx][colIdx] = !newState[rowIdx][colIdx]; // invert button state
            return newState;
        });
    }

    return (
        <div className="calenderContainer">
            <div className="promptText">When is your event?</div>
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
    );    
};

export default Calender