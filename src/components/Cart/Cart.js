import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total,product)=> total+product.price ,0)

    function formatNumber(num){
        const precision = num.toFixed(2);
        return Number(precision);
    }

    let total = 0;
    for(let i = 0; i<cart.length; i++){
        const product = cart[i];
        // total = total + product.price;
        total = total + product.price * product.quantity;

    }

    let shipping = 0;
    if (total<35){
        shipping = 0;
    }
    else if (total<99.99){
        shipping = 8;
    }
    else if (total<499.99){
        shipping = 12.99;
    }
    else{
        shipping= 20;
    }

    const tax = total/10;

    const grandTotal =  total + shipping + tax ;


    

    return (
        <div style={{textAlign:"center"}}>
            <h4>Order Summary</h4>
            <h5> Items Ordered: {cart.length}</h5>
            <p>Product Price: {formatNumber(total)} </p>
            <p><small> Shipping Cost: {formatNumber(shipping)} </small></p>
            <p><small> Tax+VAT: {formatNumber(tax)} </small></p>
            <p>Total Price: {formatNumber(grandTotal)} </p>
           {
               props.children
           }
        </div>
    );
};

export default Cart;