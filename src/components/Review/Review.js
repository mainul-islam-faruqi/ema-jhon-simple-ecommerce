import React, { useState } from 'react';
import { useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';

const Review = () => {
    const [cart, setCart] = useState([]);

    const removeItem = productKey =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        
        const cartProduct = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
             product.quantity = saveCart[key];
             return product;
        })
        setCart(cartProduct);
    },[])
    return (
        <div className="shop-container">
            <div className="product-container">
            {cart.map(pd=><ReviewItem product={pd} removeItem={removeItem} ></ReviewItem>)}
            </div>
            <div className="cart-contianer">
               <Cart cart={cart} ></Cart>
            </div>
        </div>
    );
};

export default Review;