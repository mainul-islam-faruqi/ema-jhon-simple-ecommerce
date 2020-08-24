import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total,product)=> total+product.price ,0)

    let total = 0;
    for(let i = 0; i<cart.length; i++){
        const product = cart[i];
        // total = total + product.price;
        total += product.price;
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <h5> Items Ordered: {cart.length}</h5>
            <p>Total Price: {total} </p>
        </div>
    );
};

export default Cart;