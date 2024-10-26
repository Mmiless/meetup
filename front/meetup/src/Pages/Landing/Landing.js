import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Calender from "./LandingComponents/Calender";
import Time from "./LandingComponents/Time";
import Submission from "./LandingComponents/Submission";

import "./Landing.css"

const Landing = () => {

    const navigate = useNavigate();
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(1);
    const [selectedDates, setSelectedDates] = useState([]);

    const createEvent = (eventName) => {
        // POST request endpoint create resource

        navigate('/Login');
        // have start and endTime
        const name_ = eventName
        const start = startTime
        const end  = endTime

    }

    return (
        <div className="landingContainer">
                <Calender />
                <Time setStartTime={setStartTime} setEndTime={setEndTime} />
                <Submission setStartTime={setStartTime} setEndTime={setEndTime} onSubmit={createEvent} />
        </div>
            
    );
};

export default Landing;
