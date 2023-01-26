import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key, price } = props.item;
    const reviewStyle = {
        marginLeft: '150px',
        marginBottom: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid lightGray'
    }
    return (
        <div style={reviewStyle}>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <button className='add-btn'
                onClick={() => props.removeHandler(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;