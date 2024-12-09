import Header from '../../Hooks/Header';
import Login from './EventRoomComponents/Login';
import TimeSlots from './EventRoomComponents/TimeSlots';

const EventRoom = () => {

    const login = async(username, password) => {
        console.log(username, password);
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            // logic to start web socket connection w/ user credentials
        }
    };

    return (
        <div className='flex flex-col items-center space-y-8 pb-8'>
            <Header />
            <div className='flex flex-row'> 
                <div className="border border-gray-300 p-4">
                    <Login onsubmit={login}/>
                </div>
                <div className="border border-gray-300 p-4">
                    <TimeSlots />
                </div>
            </div>
        </div>
    );
};

export default EventRoom;