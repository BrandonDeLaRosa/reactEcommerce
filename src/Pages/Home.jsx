import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { byNameThunk, filteredCategoryThunk, getProductsThunk } from '../store/slices/product.slice';

const Home = () => {
    // ------------------------- All PRoducts ------------------------
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [categoriesList, setCategoriesList] = useState([])
    useEffect(() => {
        dispatch(getProductsThunk())
       axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
        .then(res => setCategoriesList(res.data.data.categories))
    },[])
    
    console.log(products);

    // ------------------------- Products Categries-------------------

    console.log(categoriesList);

    // const filteredProducts = products.filter(productItem => productItem.category.id === categoriesList.id)
    const [isVisible, setIsVisible] = useState(false)

    // -------------------------- Search By Name ----------------------------
    
    const [searchByName, setSearchByName] = useState("")

    return (
        <div className='homeContainer'>

            <div className='categoriesContainer'>
              <div className='categoriesMenu'>
                <h4>Categories</h4>
                <button 
                    className='categoriesArrow'
                    onClick={() => setIsVisible(!isVisible)}
                    style={{
                        rotate: "180deg",
                        transition: "1s"
                    }}
                    >
                    <h6>
                    {isVisible?  
                    <i class="fa-solid fa-chevron-up"></i>  
                    : 
                    <i class="fa-solid fa-chevron-down"></i>}
                    </h6>
                </button>
              </div>

                {isVisible? (
                    <>
                    <ul className='categories'>
                    {
                        categoriesList.map(category => (
                            <button className='category' key={category.id}
                                onClick={() => dispatch(filteredCategoryThunk(category.id))}>
                                {category.name}
                            </button>
                        ))
                    }
                </ul>
                    </>
                ): (
                    <>
                    
                    </>
                )
            }
            </div>

            <div className='productsContainer'>
                
                <div className='inputContainer'>
                    <form>
                        <input className='inputSearch' type="text" value={searchByName} onChange={e => setSearchByName(e.target.value)} placeholder="      Search by name" />
                        <button className='searchButton'
                            onClick={() => dispatch(byNameThunk(searchByName))}
                        >
                            Submit</button>
                    </form>
                </div>
                <ul className='cardsContainer'>
                    {
                        products.map(product => (
                            <li className='productCard'
                                key={product.id}>
                                <div className='imgContainer'>
                                    <img className='listImg' src={product.productImgs[0]} alt="" 
                                    style={{
                                        height: "200px",
                                        // objectFit:"contain",
                                        // widht: "50%"
                                    }}/> <br />
                                     {/* <img className='listImg2' src={product.productImgs[1]} alt="" 
                                      style={{
                                        height: "200px",
                                        objectFit:"contain",
                                        // widht: "50%"
                                    }}
                                     /> */}
                                    
                                </div>
                               
                                <Link to={`/products/${product.id}`}>
                                    <h3 className='listProduct' >{product.title}</h3>
                                </Link>
                                <h3 className='listProductPrice' > <b>Price: </b>${product.price}</h3>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Home;

/*


    return (
        <div className='homeContainer'>

            <div className='categoriesContainer'>
              <div className='categoriesMenu'>
                <h4>Categories</h4>
                <button 
                    className='categoriesArrow'
                    onClick={() => setIsVisible(!isVisible)}
                    >
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
              </div>

                {isVisible? (
                    <>
                    <ul className='categories'>
                    {
                        categoriesList.map(category => (
                            <button className='category' key={category.id}
                                onClick={() => dispatch(filteredCategoryThunk(category.id))}>
                                -{category.name}
                            </button>
                        ))
                    }
                </ul>
                    </>
                ): (
                    <>
                    
                    </>
                )
            }
            </div>

            <div className='productsContainer'>
                
                <div className='inputContainer'>
                    <form className="mb-3">
                        <input className='inputName' type="text" value={searchByName} onChange={e => setSearchByName(e.target.value)} placeholder="      Search by name" />
                        <button className='searchButton'
                            onClick={() => dispatch(byNameThunk(searchByName))}
                        >
                            Submit</button>
                    </form>
                </div>
                <ul className='cardsContainer'>
                    {
                        products.map(product => (
                            <li className='productCard'
                                key={product.id}>
                                <div className='imgContainer'>
                                    <img className='listImg' src={product.productImgs[0]} alt="" />
                                    {/* <img className='listImg2' src={product.productImgs[1]} alt="" /> *
                                    </div>
                               
                                    <Link to={`/products/${product.id}`}>
                                        <h3 className='listProduct' >{product.title}</h3>
                                    </Link>
                                    <h3 className='listProduct' > <b>Price: </b>${product.price}</h3>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    };
    

*/