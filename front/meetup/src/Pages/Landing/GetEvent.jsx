import React from "react";

const GetEvent = ({ eventHash, setEventHash, onSubmit }) => {

    const handleChange = (e) => {
        setEventHash(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(eventHash); 
    };

    return (
        <form className="w-80 flex flex-col space-y-4" onSubmit={handleSubmit}>
            <label className="font-semibold" htmlFor="eventHash">Event ID</label>
            <input className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" id="eventHash" name="eventHash"  value={eventHash} onChange={handleChange} required />
            <button className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition" type="submit">Go To Event
            </button>
        </form>
    );
};

export default GetEvent;