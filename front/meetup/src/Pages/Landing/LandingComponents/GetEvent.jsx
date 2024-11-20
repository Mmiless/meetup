import React, { useState } from "react";

import "./GetEvent.css"

const GetEvent = ({ setStartTime, setEndTime, onSubmit }) => {
    const [eventHash, setEventHash] = useState("");

    const handleChange = (e) => {
        setEventHash(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(eventHash); 
    };

    return (
        <form className="eventHashContainer" onSubmit={handleSubmit}>
            <label className="hashLabel" htmlFor="eventHash">Event ID (Given by Host)</label>
            <input type="text" className="eventHash" id="eventHash" name="eventHash"  value={eventHash} onChange={handleChange} required />
            <button className="submit" type="submit">Go To Event</button>
        </form>
    );
};

export default GetEvent;