import React, {useState, useRef} from 'react';

import Header from '../../Hooks/Header';
import Login from './Login';
import Logout from './Logout';
import TimeSlots from './TimeSlots';

const EventRoom = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userSelectedTimes, setUserSelectedTimes] = useState({});
    const [username, setusername] = useState('');
    let socket = useRef(null);

    const login = async(username, password) => {
        // establish web socket connection
        const hash = JSON.parse(localStorage.getItem('eventDetails')).hash;
        socket = new WebSocket('ws://127.0.0.1:8000/ws/event/' + hash + "/");

        socket.onopen = () => {
            socket.send(JSON.stringify({
                action: "login",
                username: username,
                password: password
            }));
        };

        socket.onmessage = (response) => {
            const data = JSON.parse(response.data);
            if (data.type === 'login_success') {
                console.log('Login success');
                setIsLoggedIn(true);
                setUserSelectedTimes(data.times);
                setusername(username);
            }
            else {
                console.error('Login failed');
                // TODO: Add more robust messaging
            }
        };

    };

    const logout = () => {
        // logic to end web socket connection, clear ref
        if (socket.current) {
            socket.current.close();
            socket.current = null;
        }
        console.log("Logged out");
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
                            socket={socket}
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