import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/orders">Manage Inventory</Link>
                <button onClick={() => setLoggedInUser({})}>{loggedInUser.isSignedIn ? 'Sign Out' : 'Sign In'}</button>
            </nav>
        </div>
    );
};

export default Header;