import React from "react";
import { fillMatrix } from "../../util";

const Calender = ({selectedDates, setSelectedDates}) => {

    const matrix = fillMatrix();

    const handleDateClick = (rowIdx, colIdx) => {
        setSelectedDates(prevState => {
            let newState = prevState.map(row => row.slice());
            newState[rowIdx][colIdx] = !newState[rowIdx][colIdx];
            return newState;
        });
    }

    return (

        <div className="flex flex-col align-center space-y-4">
            <div className="font-semibold" id="promptText">What dates?</div>
            <div className="flex flex-col gap-2" id="dateBox">
                {matrix.map((row, rowIdx) => (
                <div className="flex flex-row gap-2" key={rowIdx}>
                    {row.map((cell, colIdx) => (
                        <button className="w-12 h-12 flex items-center justify-center" key={colIdx}
                            onClick={() => handleDateClick(rowIdx, colIdx)}
                            style={{
                                backgroundColor: selectedDates[rowIdx][colIdx] ? "black" : "#ebeaed",
                                color: selectedDates[rowIdx][colIdx] ? "#ebeaed" : "black"
                            }}
                            onMouseOver={(e) =>{
                                if(e.buttons === 1) handleDateClick(rowIdx, colIdx);
                            }}
                            >
                            {cell}
                        </button>
                    ))}
            </div>
                ))}
            </div>
        </div>

    );    
};

export default Calender;