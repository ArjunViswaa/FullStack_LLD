import React from 'react';
import Logo from "/assets/images/angryBird-logo1.gif";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="flex space-x-8 items-center justify-start pl-3 py-4">
            <Link to="/">
                <img className="w-[60px]" src={Logo} />
            </Link>
            <div className="text-blue-500 text-2xl font-bold space-x-8 underline">
                <Link to="/">Movies</Link>
                <Link to="/watchlist">Watchlist</Link>
            </div>
        </div>
    );
}


export default Navbar;