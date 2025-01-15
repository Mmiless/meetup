import {useState, useEffect, useRef} from 'react';

const UserSocket = (url) => {
    const socket = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with EventRoom versions
    const [userSelectedTimes, setUserSelectedTimes] = useState({});
    const [username, setusername] = useState('');
    
    // on mount 
    const connect = async () => {
        socket.current = new WebSocket(url);

        socket.current.onmessage = (response) => {
            const data = response.data;
            const type = data.type;
            if (type === "login_success"){
                setIsLoggedIn(true);
                setUserSelectedTimes(data.times);
                setusername(username);
                
            }
            else if (type == "login_failed"){
                // TODO: Robust fail state
            }
        }

    }

    const validateUser = async (username, password) => {
        if (socket.current){
            socket.current.send(JSON.stringify({
                action: "login",
                username: username,
                password: password
            }));
        }
    }

    const updateUserTimes = async () => {
        if (socket.current){
            socket.current.send(JSON.stringify({
                action: "update_times",
                username: username,
                times: userSelectedTimes
            }));
        }
    }

    const disconnect = async () => {
        if (socket.current) {
            socket.current.close();
        }
    }

    // unmount clenup
    useEffect(() => {
        return () => {
            disconnect();
        }
    }, []);

    return {isLoggedIn, userSelectedTimes, username, connect, disconnect, validateUser, updateUserTimes};

}

export default UserSocket;