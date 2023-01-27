import React, { useEffect } from 'react';
import { useState } from 'react';
// import { CarouselItem } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice';
// import { addProductThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/product.slice';


const Products = () => {

    const [rate, setRate] = useState("")
    const productsList = useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const { id } = useParams()

    const productSelected = productsList.find(product => product.id === Number(id))
    // const products = productsList.find(productItem => productItem.id === Number (id))
    const relatedProducts = productsList.filter(productItem =>
        productItem.category.id === productSelected.category.id
        && productItem !== productSelected

    )
    // console.log(productSelected);
    // console.log(relatedProducts);

    
    const addToCart =() => {
        const productos = {
            id: productSelected.id,
            quantity: rate
        }
        dispatch(addCartThunk(productos))
    }

    return (
        <div className='detailedProductContainer'>

            <h3 className='selectedTitle'><b>{productSelected?.title}</b></h3>
            <div className='selectedProductContainer'>
                <Carousel className='carousel'>
                    <Carousel.Item className='carouselItem'>
                        <img
                            className="carouselImg"
                            src={productSelected?.productImgs?.[0]}
                            alt="First slide"
                        />
                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='carouselItem'>
                        <img
                            className="carouselImg"
                            src={productSelected?.productImgs?.[1]}
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='carouselItem'>
                        <img
                            className="carouselImg"
                            src={productSelected?.productImgs?.[2]}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div className='productDescription'>
                    <h3>Description: </h3>
                    <p className='productText'>{productSelected?.description}</p>
                    <h3>Price: </h3>
                    <p className='productText'>${productSelected?.price}</p><br />
                    <div className='addToCart'>
                        <input className='addInput' type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Add" />
                        <button  className='addBtn' onClick={addToCart}>Add To cart</button>
                    </div><hr />
                </div>

            </div>


            <div className='relatedProductContainer'>
                <h4 className='relatedText'>Discover similar items</h4>
                <div className='productsList'>
                    {
                        relatedProducts.map(relatedProduct => (
                            <Link key={relatedProduct.id} className='productCard' to={`/products/${relatedProduct.id}`}>
                                    <img className='listImg0' src={relatedProduct.productImgs[0]} alt="" />
                                    <h3 className='listProduct' >{relatedProduct.title}</h3>
                                    <h3 className='listProductPrice' > <b>$ </b>{relatedProduct.price}</h3>
                            </Link> 
                        ))
                    }
                </div>
            </div>

        </div>
    );
};

export default Products;