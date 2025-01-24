import React, {useState, useRef} from 'react';

import Header from '../../Hooks/Header';
import UserSocket from '../../Hooks/UserSocket'
import Login from './Login';
import Logout from './Logout';
import TimeSlots from './TimeSlots';

const EventRoom = () => {

    const hash = JSON.parse(localStorage.getItem('eventDetails')).hash;
    const {isLoggedIn, userSelectedTimes, setUserSelectedTimes, username, connect, disconnect, validateUser, updateUserTimes} = 
        UserSocket('ws://127.0.0.1:8000/ws/event/' + hash + "/");

    const login = async(username, password) => {
        // establish web socket connection
        await connect();
        validateUser(username, password);

    };

    const logout = async() => {
        // logic to end web socket connection, clear ref
        await disconnect();
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
                            userSelectedTimes={userSelectedTimes}
                            setUserSelectedTimes={setUserSelectedTimes}
                            updateUserSelectedTimes={updateUserTimes}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventRoom;