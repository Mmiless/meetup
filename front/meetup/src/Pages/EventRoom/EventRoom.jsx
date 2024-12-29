import React, {useState, useEffect} from 'react';

import Header from '../../Hooks/Header';
import Login from './EventRoomComponents/Login';
import Logout from './EventRoomComponents/Logout';
import TimeSlots from './EventRoomComponents/TimeSlots';

const EventRoom = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userSelectedTimes, setUserSelectedTimes] = useState({});
    const [username, setusername] = useState('');

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
            // send username to login
            setIsLoggedIn(true);
            const data = await response.json();
            setusername(username);
            setUserSelectedTimes(data.times);
            
        }
        else if (response.status === 401) {
            console.error('Invalid username or password');
        }
        else{
            console.error('Undefined server error');
        }
    };

    const logout = () => {
        // logic to end web socket connection (later)
        setIsLoggedIn(false);
        setUserSelectedTimes({});
        setusername('');
    }

    return (
        <div className='flex flex-col items-center space-y-8 pb-8'>
            <Header />
            <div className='flex items-start flex-row space-x-4 '> 
                <div className="border border-gray-300 p-4">
                    {!isLoggedIn ? 
                         <Login onSubmit={login} /> : 
                         <Logout onSubmit={logout} username={username} /> }
                </div>
                <div className="border border-gray-300 p-4 max-w-[1000px] overflow-x-scroll">
                    <div className="min-w-max">
                        <TimeSlots
                            isLoggedIn={isLoggedIn}
                            username={username}
                            userSelectedTimes={userSelectedTimes}
                            setUserSelectedTimes={setUserSelectedTimes}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventRoom;