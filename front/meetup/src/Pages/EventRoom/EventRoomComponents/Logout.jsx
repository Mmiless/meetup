import React from 'react';

const Logout = ({onSubmit, username}) => {
    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(); 
    };

    return (
        <div className="w-80 flex flex-col p-4 space-y-8">
            <h1 className="font-source-code">Logged in as: {username}</h1>
            <button className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition font-source-code" onClick={handleSubmit}>Log Out</button>
        </div>
    );
};

export default Logout;