import React from 'react';
import { Link } from 'react-router-dom';

const Header = () =>{

    return (
        <div className="sticky top-0 w-full bg-gray-700 text-white py-4 px-6 shadow-md headerContainer">
            <nav class="px-10 font-source-code ">
                <Link to='/'>Meetup</Link>
            </nav>
        </div>
    );
};

export default Header;