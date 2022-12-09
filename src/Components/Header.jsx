import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='navContainer'>
            <div className='navBar'>
                <Link className='eCom' to="/">e-commerce</Link>

                <div className='links'>
                    <Link className='link' to="/login"><i class="fa-solid fa-user"></i></Link>
                    <Link className='link' to="/singin"><i class="fa-solid fa-user-plus"></i></Link>
                    <Link className='link' to="/cart"><i class="fa-solid fa-cart-shopping"></i></Link>
                    <Link className='link' to="/purchases"><i class="fa-solid fa-bag-shopping"></i></Link>
                </div>
            </div>
        </div>
    );
};

export default Header;