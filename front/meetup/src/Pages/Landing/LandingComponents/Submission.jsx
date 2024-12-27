import React, { useState } from "react";

const Submission = ({ onSubmit }) => {
    const [eventName, setEventName] = useState("");

    const handleChange = (e) => {
        setEventName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(eventName); 
    };

    return (
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <label className="nameLabel font-semibold" htmlFor="eventName">Event Name</label>
            <input className="w-60 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" id="eventName" name="eventName"  value={eventName} onChange={handleChange} required />
            <button className="w-60 bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition" type="submit">Create Event</button>
        </form>
    );
};

export default Submission;