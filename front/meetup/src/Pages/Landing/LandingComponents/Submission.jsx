import React, { useState } from "react";

import "./Submission.css"

const Submission = ({ setStartTime, setEndTime, onSubmit }) => {
    const [eventName, setEventName] = useState("");

    const handleChange = (e) => {
        setEventName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(eventName); 
    };

    return (
        <form className="eventNameContainer" onSubmit={handleSubmit}>
            <label className="nameLabel" htmlFor="eventName">Event Name</label>
            <input type="text" className="eventName" id="eventName" name="eventName"  value={eventName} onChange={handleChange} required />
            <button className="submit" type="submit">Create Event</button>
        </form>
    );
};

export default Submission;