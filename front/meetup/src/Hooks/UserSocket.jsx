import {useState, useEffect, useRef} from 'react';

const UserSocket = (url) => {
    const socket = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with EventRoom versions
    const [userSelectedTimes, setUserSelectedTimes] = useState({});
    const [username, setUsername] = useState("");
    const [allTimes, setAllTimes] = useState({});
    
    // on mount 
    const connect = async () => {
        return new Promise((resolve, reject) => {
            socket.current = new WebSocket(url);

            socket.current.onopen = () => {
                resolve();
            }

            socket.current.onerror = () => {
                reject();
            }

            socket.current.onmessage = (response) => {
                const data = JSON.parse(response.data);
                if (data.type === "login_success"){
                    setIsLoggedIn(true);
                    setUserSelectedTimes(data.times);
                    setUsername(data.username);
                    
                }
                else if (data.type === "login_failed"){
                    // TODO: Robust fail state
                }
                else if (data.type == "times_updated"){
                    // TODO: idk
                    console.log("Time updated");
                }
                else if (data.type == "all_times"){
                    setAllTimes(data.times);
                }
            }
        });
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
        return new Promise(() => {
            if (socket.current) {
                socket.current.close();
                setIsLoggedIn(false);
                setUserSelectedTimes({});
                setUsername("");
            }
        });
    }

    // unmount clenup
    useEffect(() => {
        return () => {
            disconnect();
        }
    }, []);

    return {isLoggedIn, userSelectedTimes, setUserSelectedTimes, username,
        connect, disconnect, validateUser, updateUserTimes, allTimes};

}

export default UserSocket;