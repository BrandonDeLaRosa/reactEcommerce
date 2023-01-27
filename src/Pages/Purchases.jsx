import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slices';

const Purchases = () => {
    const dispatch= useDispatch()
    const purchases = useSelector(state => state.purchases) 

    useEffect(() =>{
        dispatch(getPurchasesThunk())
    },[])

    return (
        <div className='purchasesContainer'>
            <h1>Purchases Page</h1>

            <ul className='puschasesLink'>
                {
                    purchases.map(purchase => (
                        <li key={purchase.id}>
                            {
                                purchase.cart.products.map(product => (
                                    <div key={product.id}>
                                        <Link className='purchasesLink'  to={`/products/${product.id}`}>
                                        <h4 className='purchaseProduct'><b>Product: </b>{product.title}</h4>
                                        </Link>
                                        <h4><b>Price: </b>{product.price}</h4>
                                        <h4><b>Purchase date: </b>{product.createdAt}</h4> <br /><hr />
                                    </div>
                                ))
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;