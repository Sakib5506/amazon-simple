import React from 'react';


const Cart = (props) => {
    let productPrice = 0;
    for (let i = 0; i < props.cart.length; i++) {
        const product = props.cart[i];
        productPrice = productPrice + product.price * props.cart[i].quantity || 1;
    }

    const formatNumber = (num) => {
        const newNum = num.toFixed(2);
        return Number(newNum);
    }

    const taxVat = productPrice / 10;

    let shippingCost = 0;
    if (productPrice > 50) {
        shippingCost = 0;
    } else if (productPrice > 30) {
        shippingCost = 6.99;
    } else if (productPrice > 0) {
        shippingCost = 9.99;
    }

    const total = productPrice + shippingCost + taxVat;

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {props.cart.length}</p>
            <p>Product Price: {formatNumber(productPrice)}</p>
            <p>Shipping Cost: {formatNumber(shippingCost)} </p>
            <p>Tax + VAT: {formatNumber(taxVat)}</p>
            <p>Total Price: {formatNumber(total)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;