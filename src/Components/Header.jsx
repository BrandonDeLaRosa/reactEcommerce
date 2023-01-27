import React from 'react';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from '../Pages/Cart';

const Header = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='navContainer'>
            <>
            <div className='navBar'>
                <Link className='eCom' to="/">e-commerce</Link>

                <div className='links'>
                    <Link className='link' to="/login"><i class="fa-solid fa-user"></i></Link>
                    <Link className='link' to="/singin"><i class="fa-solid fa-user-plus"></i></Link>
                    {/* <Link onClick={handleShow} className='link' to="/cart"><i class="fa-solid fa-cart-shopping"></i>cart</Link> */}
                    <Link onClick={handleShow} className='link'><i class="fa-solid fa-cart-shopping"></i></Link>
                    <Link className='link' to="/purchases"><i class="fa-solid fa-bag-shopping"></i></Link>
                </div>
            </div>
            <Cart show={show} handleClose={handleClose}/>   
            </>
        </div>
    );
};

export default Header;

/*

<Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Users Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.
                    </Offcanvas.Body>
                </Offcanvas>

                */