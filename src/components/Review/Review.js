import React, { useState } from 'react';
import { useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()

    const handlePlaceCheckout = () => {
        setCart([])
        setOrderPlaced(true)
        processOrder()
    }

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
    let thankyou;
    if (orderPlaced){
        thankyou = <img src="../../images/giphy.gif" alt=""/>
    }

    return (
        <div className="shop-container">
            <div className="product-container">
            {cart.map(pd=><ReviewItem product={pd} removeItem={removeItem} ></ReviewItem>)}
            {thankyou}
            </div>
            <div className="cart-contianer">
               <Cart cart={cart} >
               <button className="main-button" onClick={handlePlaceCheckout}> Proceed Checkout </button>
               </Cart>
               
            </div>
        </div>
    );
};

export default Review;