import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventByHash } from '../../utils/eventUtils';

import Header from '../../components/Header';
import UserSocket from '../../hooks/UserSocket';
import Login from './Login';
import Logout from './Logout';
import TimeSlots from './TimeSlots';

const EventRoom = () => {
    const { eventHash } = useParams();
    const navigate = useNavigate();
    const [eventDetails, setEventDetails] = useState(null);

    // Fetch event details on mount
    useEffect(() => {
        const getEventDetails = async () => {
            try {
                const storedDetails = localStorage.getItem('eventDetails');
                if (storedDetails) {
                    const parsedDetails = JSON.parse(storedDetails);
                    
                    if (parsedDetails && parsedDetails.hash === eventHash) {
                        setEventDetails(parsedDetails);
                        return;
                    }
                }
                const event = await fetchEventByHash(eventHash);
                setEventDetails(event);
                
            } catch (error) {
                console.error("Error fetching event:", error);
                navigate("/")
            }
        };
        
        getEventDetails();
    }, [eventHash, navigate]);

    const {
        isLoggedIn, 
        userSelectedTimes, 
        setUserSelectedTimes, 
        username, 
        connect, 
        disconnect, 
        validateUser, 
        updateUserTimes, 
        allTimes
    } = UserSocket(`ws://127.0.0.1:8000/ws/event/${eventHash}/`);

    const login = async(username, password) => {
        await connect();
        validateUser(username, password);
    };

    const logout = async() => {
        await disconnect();
    };

    if (!eventDetails) {
        return (
            <div className='flex flex-col items-center space-y-8 pb-8'>
                <Header />
                <div>Loading event...</div>
            </div>
        );
    }

    // Display event
    return (
        <div className='flex flex-col items-center space-y-8 pb-8'>
            <Header />
            <div className="text-xl font-bold">{eventDetails.name}</div>
            <div className="text-sm text-gray-500">Event ID: {eventHash}</div>
            
            <div className='flex items-start flex-row space-x-4'> 
                <div className="border border-gray-300 p-4">
                    {!isLoggedIn ? 
                         <Login onSubmit={login} /> : 
                         <Logout onSubmit={logout} username={username} /> }
                </div>
                <div>
                    <div className="min-w-max">
                        <TimeSlots
                            isLoggedIn={isLoggedIn}
                            allTimes={allTimes}
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