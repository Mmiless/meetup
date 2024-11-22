import React, { useState } from "react";

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
        <form class="flex flex-col p-4 space-y-4" className="eventHashContainer" onSubmit={handleSubmit}>
            <label class="font-semibold" className="hashLabel" htmlFor="eventHash">Event ID</label>
            <input class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" className="eventHash" id="eventHash" name="eventHash"  value={eventHash} onChange={handleChange} required />
            <button class="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition" className="submit" type="submit">Go To Event
            </button>
        </form>
    );
};

export default GetEvent;