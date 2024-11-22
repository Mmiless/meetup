import React, { useState } from "react";

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
        <form class="flex flex-col p-4 space-y-4" className="eventNameContainer" onSubmit={handleSubmit}>
            <label className="nameLabel font-semibold" htmlFor="eventName">Event Name</label>
            <input class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" className="eventName" id="eventName" name="eventName"  value={eventName} onChange={handleChange} required />
            <button class="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition" className="submit" type="submit">Create Event</button>
        </form>
    );
};

export default Submission;