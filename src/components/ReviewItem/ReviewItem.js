import React from 'react';

const ReviewItem = (props) => {
    const {name,quantiry}= props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        paddingBottom: '10px',
        margin:'10px 100px'

    };
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name"> {name} </h4>
            <p> Quantity: {quantiry} </p>
            <button className="main-button">
                Remove
            </button>
        </div>
    );
};

export default ReviewItem;