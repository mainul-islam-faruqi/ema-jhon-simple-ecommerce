import React, { useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Product/Product';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [ products, setProducts] = useState(first10);
    function handleAddProduct(product){
        console.log('click marse', product)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => 
                    <Product product={product} handleAddProduct={handleAddProduct} key="">  </Product>)
                }
            </div>
            <div className="cart-container">

            </div>
            
        </div>
    );
};

export default Shop;