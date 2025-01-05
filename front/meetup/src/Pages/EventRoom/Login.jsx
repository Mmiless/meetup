import React, {useState} from 'react';

const Login = ({ onSubmit }) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(username, password); 
    };

    return (
        <form className="w-80 flex flex-col p-4 space-y-4" onSubmit={handleSubmit}>
            <label className="nameLabel font-semibold font-source-code" htmlFor="eventName">Name</label>
            <input className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" id="eventName" name="eventName"  value={username} onChange={handleUsernameChange} required />
            <label className="nameLabel font-semibold font-source-code" htmlFor="eventName">Password (Optional)</label>
            <input className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" id="eventName" name="eventName"  value={password} onChange={handlePasswordChange} />
            <button className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition font-source-code" type="submit">Log In / Sign Up</button>
        </form>
    );
};  

export default Login;