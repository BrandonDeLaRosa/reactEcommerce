import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { byNameThunk, filteredCategoryThunk, filteredPrice, getProductsThunk } from '../store/slices/product.slice';

const Home = () => {
    // ------------------------- All PRoducts ------------------------
    const [categoriesList, setCategoriesList] = useState([])
    const [searchByName, setSearchByName] = useState("")
    const [fromPrice, setFromPrice] = useState("")
    const [toPrice, setToPrice] = useState("")

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()


    const noPrice = () => {
        setFromPrice("")
        setToPrice("")
        dispatch(getProductsThunk())
    }

    useEffect(() => {
        if (searchByName) {
            dispatch(byNameThunk(searchByName))
        } else {
            dispatch(getProductsThunk())
        }
    }, [searchByName])

    useEffect(() => {
        axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
            .then(res => setCategoriesList(res.data.data.categories))
    }, [])

    // console.log(products);
    // console.log(categoriesList);

    // ------------------------- Products Categries-------------------

    // const filteredProducts = products.filter(productItem => productItem.category.id === categoriesList.id)
    const [isVisible, setIsVisible] = useState(false)
    const [isPriceVisible, setPriceVisible] = useState(false)

    // -------------------------- Search By Name ----------------------------


    return (
        <div className='homeContainer'>

            <div className='filtersContainer'>

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
                            {isVisible ?
                                <i class="fa-solid fa-chevron-up"></i>
                                :
                                <i class="fa-solid fa-chevron-down"></i>}
                        </h6>
                    </button>
                </div>


                {isVisible ? (
                    <>
                        <ul className='categories'>
                            <button onClick={() => dispatch(getProductsThunk())} className='category'>
                                All Products</button>
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
                ) : (<></>)}

                <div className='priceContainer'>

                    <div className='priceMenu'>
                        <h4>Price Filter</h4>
                        <button
                            className='categoriesArrow'
                            onClick={() => setPriceVisible(!isPriceVisible)}
                            style={{
                                rotate: "180deg",
                                transition: "1s"
                            }}
                        >
                            <h6>
                                {isPriceVisible ?
                                    <i class="fa-solid fa-chevron-up"></i>
                                    :
                                    <i class="fa-solid fa-chevron-down"></i>}
                            </h6>
                        </button>
                    </div>

                    {
                        isPriceVisible ?
                            (
                                <>
                                    <form className='priceInputs'>
                                        <input className='priceInput' type="number" value={fromPrice} onChange={e => setFromPrice(e.target.value)} placeholder="    From:" />
                                        <input className='priceInput' type="number" value={toPrice} onChange={e => setToPrice(e.target.value)} placeholder="    To:" />
                                    </form>
                                    <div className='priceBtns'>
                                        <button className='priceBtn' onClick={() => dispatch(filteredPrice({ toPrice, fromPrice }))}>
                                            submit
                                        </button>
                                        <button className='priceBtn' onClick={noPrice}>Reset</button>
                                    </div>
                                </>
                            )
                            :
                            (
                                <></>
                            )
                    }
                </div>
            </div>
            <div className='productsContainer'>

                <div className='cardsContainer'>

                    <form className='inputForm'>
                        <input className='inputSearch' type="text" value={searchByName} onChange={e => setSearchByName(e.target.value)} placeholder="      Search by name" />
                        <button className='searchButton'
                            onClick={() => dispatch(byNameThunk(searchByName))}>
                            Submit
                        </button>
                    </form>

                    <div className='productsList'>
                        {
                            products.map(product => (

                                <Link to={`/products/${product.id}`} className='productCard'
                                    key={product.id}>

                                    <div className='imgContainer'>
                                        <img className='listImg0' src={product.productImgs[0]} alt=""/> <br />
                                        <img className='listImg1' src={product.productImgs[1]} alt=""/>
                                    </div>
                                    <h3 className='listProduct' >{product.title}</h3>                                   
                                    <h3 className='listProductPrice' > <b>$ </b>{product.price}</h3>
                                </Link>
                            ))
                        }
                    </div>
                </div>
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