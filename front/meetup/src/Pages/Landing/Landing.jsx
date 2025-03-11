import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getDateFromIndices } from "../../util"; // Keep this original import

import Header from "../../Hooks/Header";
import Calender from "./Calender";
import Time from "./Time";
import CreateEvent from "./CreateEvent";
import GetEvent from "./GetEvent";

const Landing = () => {
    const navigate = useNavigate();
    const [eventHash, setEventHash] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(1);
    const [selectedDates, setSelectedDates] = useState(Array.from({ length: 5 }, () => Array(7).fill(false)));

    const createEvent = async (eventName) => {
        let formattedDates = [];
        selectedDates.forEach((row, rowIdx) => {
            row.forEach((isSelected, colIdx) => {
                if (isSelected) {
                    formattedDates.push(getDateFromIndices(rowIdx, colIdx, new Date()));
                }
            });
        });
        
        const hash = uuidv4();
        const eventPayload = {
            action: "create_event",
            hash: hash,
            name: eventName,
            start_time: startTime,
            end_time: endTime,
            dates: formattedDates,
            participants: "{}",
        };

        const socket = new WebSocket('ws://127.0.0.1:8000/ws/event/' + hash + "/");
        socket.onopen = () => {
            if(formattedDates.length === 0) {
                console.log("Must choose at least one day.");
            }
            else{
                socket.send(JSON.stringify(eventPayload));
            }
        }
        socket.onmessage = (response) => {
            const data = JSON.parse(response.data);
            if (data.type === 'event_created') {
                const event = data.event;
                localStorage.setItem('eventDetails', JSON.stringify(event));
                navigate(`/event/${hash}`);
            }
            else {
                console.error('Failed to create event');
            }
            socket.close();
        }
    };

    const getEvent = async (eventHash) => {
        const eventPayload = {
            action: "get_event",
            hash: eventHash,
        };

        const socket = new WebSocket('ws://127.0.0.1:8000/ws/event/' + eventHash + "/");
        socket.onopen = () => {
            socket.send(JSON.stringify(eventPayload));
        }
        socket.onmessage = (response) => {
            const data = JSON.parse(response.data);
            if (data.type === 'event_found') {
                const event = data.event;
                localStorage.setItem('eventDetails', JSON.stringify(event));
                navigate(`/event/${eventHash}`);
            }
            else {
                console.error('Failed to find event');
            }
            socket.close();
        }
    };

    return (
        <div className="flex flex-col items-center space-y-8 pb-8 font-source-code">
            <Header />
            <div className="flex items-start flex-row space-x-4">
                <div className="flex flex-col items-start space-y-4 border border-gray-300 p-4">
                    <h1 className="text-lg font-bold mb-4 text-center" >Existing event</h1>
                    <GetEvent 
                        eventHash={eventHash} 
                        setEventHash={setEventHash} 
                        onSubmit={getEvent} />
                </div>
                <div className="flex p-4 flex-col items-start space-y-4 border border-gray-300">
                    <h1 className="text-lg font-bold mb-4 text-center">New event</h1>
                    <Calender 
                        selectedDates={selectedDates} 
                        setSelectedDates={setSelectedDates} />
                    <Time 
                        startTime={startTime} 
                        setStartTime={setStartTime} 
                        endTime={endTime}
                        setEndTime={setEndTime} />
                    <CreateEvent onSubmit={createEvent} />
                </div>
            </div>
        </div>
    );
};

export default Landing;