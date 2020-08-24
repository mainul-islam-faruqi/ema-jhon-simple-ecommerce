import React, { useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Product/Product';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [ products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])
    console.log(cart);

    function handleAddProduct(product){
        console.log('click marse', product)
        const newCart = [...cart, product];
        setCart(newCart);
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
                <h5> Order Summary: {cart.length}</h5>

            </div>
            
        </div>
    );
};

export default Shop;