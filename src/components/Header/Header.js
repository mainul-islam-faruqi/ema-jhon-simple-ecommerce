import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav>
               <Link href="/shop">Shop</Link>
               <Link href="/review">Order Review</Link>
               <Link href="/inventory"> Manage Inventory</Link>
            </nav>
        </div>
    );
};

export default Header;


// CrazyPythonLover1
// 01795115755mif

