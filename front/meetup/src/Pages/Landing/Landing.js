import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import Calender from "./LandingComponents/Calender";
import Time from "./LandingComponents/Time";
import Submission from "./LandingComponents/Submission";

import "./Landing.css"

const getDateFromIndices = (rowIdx, colIdx, startDate) => {
    const date = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
    date.setUTCDate(date.getUTCDate() + (rowIdx * 7) + colIdx);

    // Format as a date string in "YYYY-MM-DD" format
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`; 
};

const Landing = () => {

    const navigate = useNavigate();
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(1);
    const [selectedDates, setSelectedDates] = useState(Array.from({ length: 5 }, () => Array(7).fill(false)));

    const createEvent = async (eventName) => {
        let formattedDates = [];
        console.log(selectedDates);
        selectedDates.forEach((row, rowIdx) => {
            row.forEach((isSelected, colIdx) => {
                if (isSelected) {
                    formattedDates.push(getDateFromIndices(rowIdx, colIdx, new Date()));
                }
            });
        });
        const eventDetails = {
            hash: uuidv4(),
            name: eventName,
            start_time: startTime,
            end_time: endTime,
            dates: formattedDates,
            participants: [],
        };
        console.log(eventDetails);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/events/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventDetails),
            });

            if (response.ok) {
                navigate('/Login');
            } else {
                console.error('Failed to create event');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="landingContainer">
                <Calender selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
                <Time startTime= {startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
                <Submission onSubmit={createEvent} />
        </div>
            
    );
};

export default Landing;
