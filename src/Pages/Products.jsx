import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/product.slice';


const Products = () => {

    const productsList = useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsThunk())
    },[])

    const { id }= useParams()
    const productSelected = productsList.find(product => product.id === Number(id))
    
    const relatedProducts = productsList.filter(productItem => 
        productItem.category.id === productSelected.category.id
        && productItem !== productSelected
        
        )


    // console.log(productSelected);
    // console.log(relatedProducts);
    return (
        <div>
            <Link to={`/products/${productSelected?.id}`}>
            <h1>{productSelected?.title}</h1>
            </Link>
            <img src={productSelected?.productImgs[0]} alt="" 
            style={{
                width: "40%",
                height: "40%"
                }} 
            />
            <h3>Description: </h3>
            <p>{productSelected?.description}</p>
            <h3>Price: </h3>
            <p>${productSelected?.price}</p><hr /><br />

            <h2>Related Products</h2>
                <ul>
                    {
                        relatedProducts.map(relatedProduct =>(
                            <li>

                                <Link to={`/products/${relatedProduct.id}`}>{relatedProduct.title}
                                </Link> <br />

                                <img src={relatedProduct.productImgs[0]} alt="" 
                                style={{
                                    width: "30%",
                                    height: "30%"
                                    }} 
                                />

                            </li>
                        ))
                    }
                </ul>

        </div>
    );
};

export default Products;