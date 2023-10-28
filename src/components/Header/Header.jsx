import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import './Header.css';
import { BiSearch } from 'react-icons/bi';

const Header = () => {
    const loc = useLocation();


    const [searchQuery, setSearchQuery] = useState('');


    const handleSearch = async (e) => {
        e.preventDefault();
        try {

            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    };

    return (
        <nav>
            <div className="logo">
                <NavLink to='/'>
                    <img src={logo} alt="netflix" />
                </NavLink>
            </div>
            <div className="menus">
                <Link to='/' className={`${loc.pathname === '/' ? 'active' : ''}`}>Home</Link>
                <Link to='/tvshows' className={`${loc.pathname === '/tvshows' ? 'active' : ''}`}>Tv Shows</Link>
                <Link to='/movies' className={`${loc.pathname === '/movies' ? 'active' : ''}`}>Movies</Link>
                <Link to='/recentlyadded' className={`${loc.pathname === '/recentlyadded' ? 'active' : ''}`}>Recently Added</Link>
            </div>
            <form className="search" onSubmit={handleSearch}>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Search movies...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type='submit'><BiSearch /></button>
            </form>
        </nav>
    );
}

export default Header;
