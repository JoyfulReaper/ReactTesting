import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
    <header className="App-header">
        <ul className="container">
            <li>
                <Link to='/'>My Stite</Link>
            </li>
            <li>
                <Link to="/new">New Post</Link>
            </li>
        </ul>
    </header>
);

export default Header;