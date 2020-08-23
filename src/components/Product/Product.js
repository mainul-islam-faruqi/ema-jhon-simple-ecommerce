import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const { name, img, seller, price, stock } = props.product
    return (
        <div className="product">
            <div className=''>
                <img src={img} alt="" />
            </div>
            <div className=''>
                <h4 className="product-name"> {name} </h4>
                <p><small>by: {seller} </small></p>
                <p>$ {price} </p>
                <br />
                <p><small> Only {stock} left in stock - Order soon </small></p>
                <button className="main-button"> <FontAwesomeIcon icon={faShoppingCart
                }/> add to cart </button>
            </div>
        </div>
    );
};

export default Product;