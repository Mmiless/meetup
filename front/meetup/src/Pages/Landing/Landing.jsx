import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import Header from "../../Hooks/Header";
import Calender from "./LandingComponents/Calender";
import Time from "./LandingComponents/Time";
import Submission from "./LandingComponents/Submission";
import GetEvent from "./LandingComponents/GetEvent";

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
    const [eventHash, setEventHash] = useState('');
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
            participants: "{}",
        };
        console.log(eventDetails);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/newevent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventDetails),
            });

            if (response.ok) {
                localStorage.setItem('eventDetails', JSON.stringify(eventDetails));
                navigate('/EventRoom');
            } else {
                console.error('Failed to create event');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getEvent = async (eventHash) => {
        try{
            const response = await fetch('http://127.0.0.1:8000/api/getevent?hash=' + eventHash, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const eventDetails = await response.json();
                localStorage.setItem('eventDetails', JSON.stringify(eventDetails));
                console.log(eventDetails);
                navigate('/EventRoom');
            }

        } catch (e){
            console.error('Error: ', e)
        }
    };

    return (
        <div className="flex flex-col items-center space-y-8 pb-8 font-source-code">
            <Header />
            <div className="flex flex-row space-x-4">
                <div className="flex flex-col items-center space-y-4 border border-gray-300 p-4">
                    <h1 className="text-lg font-bold mb-4 text-center" >Existing event</h1>
                    <GetEvent eventHash={eventHash} setEventHash={setEventHash} onSubmit={getEvent} />
                </div>
                <div className="flex flex-col items-center space-y-4 border border-gray-300 p-4">
                    <h1 className="text-lg font-bold mb-4 text-center">New event</h1>
                    <Calender selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
                    <Time startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
                    <Submission onSubmit={createEvent} />
                </div>
            </div>
            
        </div>
            
    );
};

export default Landing;
