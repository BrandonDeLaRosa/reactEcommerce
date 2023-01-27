import React from 'react';
import './Carousel.css'

const Carousel = ({productSelected}) => {
    return (
        <div className='carousel'>
               <img className='carouselImg' src={productSelected?.productImgs[0]} alt=""/>
               <img className='carouselImg' src={productSelected?.productImgs[1]} alt=""/>
               <img className='carouselImg' src={productSelected?.productImgs[2]} alt=""/>
        </div>
    );
};

export default Carousel;