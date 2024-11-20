import Login from './EventRoomComponents/Login'
import TimeSlots from './EventRoomComponents/TimeSlots';

const EventRoom = () => {
    return (
        <div className='EventRoomContainer'>
            <Login />
            <TimeSlots />
        </div>
    );
};

export default EventRoom;