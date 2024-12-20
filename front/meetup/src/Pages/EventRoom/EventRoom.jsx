import React, {useState} from 'react';

import Header from '../../Hooks/Header';
import Login from './EventRoomComponents/Login';
import TimeSlots from './EventRoomComponents/TimeSlots';

const EventRoom = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async(username, password) => {
        const hash = JSON.parse(localStorage.getItem('eventDetails')).hash;
        console.log(hash, username, password);
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({hash, username, password}),
        });

        if (response.ok) {
            // logic to start web socket connection w/ user credentials
        }
    };

    return (
        <div className='flex flex-col items-center space-y-8 pb-8'>
            <Header />
            <div className='flex flex-row space-x-4'> 
                <div className="border border-gray-300 p-4">
                    <Login onSubmit={login}/>
                </div>
                <div className="border border-gray-300 p-4">
                    <TimeSlots />
                </div>
            </div>
        </div>
    );
};

export default EventRoom;