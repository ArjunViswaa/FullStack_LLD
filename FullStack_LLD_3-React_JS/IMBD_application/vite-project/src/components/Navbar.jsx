import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/react.svg";

const Navbar = () => {
    return (
        <div className='flex space-x-8 items-center pl-3 py-4'>
            <Link to="/">
                <img className="w-[50px] " src={Logo} alt="logo" />
            </Link>
            <div className='text-blue-500 text-2xl font-bold space-x-8'>
                <Link to="/">Movies</Link>
                <Link to="/watchlist">Watch List</Link>
            </div>
        </div>
    );
}

export default Navbar;