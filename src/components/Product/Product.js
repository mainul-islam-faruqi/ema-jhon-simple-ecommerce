import React from 'react';
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
                <br />
                <p><small>by: {seller} </small></p>
                <p>$ {price} </p>
                <br />
                <p><small> Only {stock} left in stock - Order soon </small></p>
            </div>
        </div>
    );
};

export default Product;