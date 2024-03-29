import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif'
import { useNavigate } from 'react-router-dom';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();

    const handleProceedCheckout = () => {

        navigate('/shipment');
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])

    const removeHandler = (key) => {
        console.log(key);
        const newCart = cart.filter((item) => item.key !== key)
        setCart(newCart);
        removeFromDatabaseCart(key);
    }

    let thankYou;
    if (orderPlaced === true) {
        thankYou = <img src={happyImg} alt="" />
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map((item) => (
                        <ReviewItem
                            item={item}
                            removeHandler={removeHandler}
                            key={item.key}
                        ></ReviewItem>
                    ))
                }
                {thankYou}
            </div>
            <div>
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className='add-btn'>Proceed Checkout</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;