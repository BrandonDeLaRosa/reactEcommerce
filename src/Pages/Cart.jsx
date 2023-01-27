
import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, deleteProductThunk, getCartProductsThunk } from '../store/slices/cart.slice';

const Cart = ({show,handleClose}) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCartProductsThunk(false))
    },[])
    const cartProducts = useSelector (state => state.cart)


    // ********************** Sino hay productos en el carrito== error 404. 
    // (data :  message : "Cart not found" status : "fail")
  
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                {
                    cartProducts?.map(cartProduct => (
                        <li key={cartProduct.id}>

                            <h3>Product: </h3><b>{cartProduct.title} </b>
                            <h3>Quantity: </h3><b>{cartProduct.productsInCart.quantity}</b>
                            <br />

                            <button className='deleteBtn' onClick={() => dispatch(deleteProductThunk(cartProduct.id))}>
                            <i class="fa-solid fa-trash-can"></i>
                            </button>
                            <hr /><br />
                        </li>
                    ))
                }

               <button className='checkout' 
               onClick={() => dispatch(checkoutCartThunk())}>
                Checkout
                </button>

            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;