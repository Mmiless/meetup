import React from "react";
import { useNavigate } from "react-router-dom";

import Calender from "./LandingComponents/Calender";
import Time from "./LandingComponents/Time";

import "./Landing.css"

const Landing = () => {

    const navigate = useNavigate();

    function createEvent(){
        // POST request endpoint create resource
        navigate('/EventLogin');
    }

    return (
        <div className="landingContainer">
                <Calender />
                <button className="submit" onClick={createEvent}>Create Event</button>
                <Time />
        </div>
            
    );
};

export default Landing;
