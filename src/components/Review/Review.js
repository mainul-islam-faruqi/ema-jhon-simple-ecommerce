import React, { useState } from 'react';
import { useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

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
             product.quantiry = saveCart[key];
             return product;
        })
        setCart(cartProduct);
    },[])
    return (
        <div>
            <h1> Cart Items:{cart.length} </h1>
            {cart.map(pd=><ReviewItem product={pd} removeItem={removeItem} ></ReviewItem>)}
        </div>
    );
};

export default Review;