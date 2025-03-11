import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../../Hooks/Header';
import UserSocket from '../../Hooks/UserSocket';
import Login from './Login';
import Logout from './Logout';
import TimeSlots from './TimeSlots';

const EventRoom = () => {
    const { eventHash } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const storedDetails = localStorage.getItem('eventDetails');
        
        if (!storedDetails) {
            console.error("No event details found");
            navigate('/');
            return;
        }
        
        try {
            const parsedDetails = JSON.parse(storedDetails);
            if (parsedDetails.hash !== eventHash) {
                // Try to fetch the event with the current hash
                const socket = new WebSocket(`ws://127.0.0.1:8000/ws/event/${eventHash}/`);
                
                socket.onopen = () => {
                    socket.send(JSON.stringify({
                        action: "get_event",
                        hash: eventHash
                    }));
                };
                
                socket.onmessage = (response) => {
                    const data = JSON.parse(response.data);
                    if (data.type === 'event_found') {
                        localStorage.setItem('eventDetails', JSON.stringify(data.event));
                        // Reload to update the page with new event data
                        window.location.reload();
                    } else {
                        console.error("Event not found");
                        navigate('/');
                    }
                    socket.close();
                };
                
                socket.onerror = () => {
                    console.error("Connection error");
                    navigate('/');
                    socket.close();
                };
            }
        } catch (error) {
            console.error("Invalid event data");
            navigate('/');
        }
    }, [eventHash, navigate]);

    // Get event details from localStorage
    const eventDetails = JSON.parse(localStorage.getItem('eventDetails') || '{}');
    
    // Set up WebSocket connection
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

    if (!eventDetails || !eventDetails.name) {
        return null; // Will redirect in useEffect
    }

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