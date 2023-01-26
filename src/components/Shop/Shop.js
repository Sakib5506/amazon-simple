import React, { useEffect, useState } from 'react';
import '../../fakeData'
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map((keys) => {
            const product = fakeData.find((item) => item.key === keys);
            product.quantity = savedCart[keys];
            return product;
        })
        setCart(cartProducts);
    }, [])

    const productAddHandler = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(item => item.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(singleProduct => (
                        <Product
                            key={singleProduct.key}
                            ShowAddToCart={true}
                            product={singleProduct}
                            productAddHandler={productAddHandler}
                        >
                        </Product>
                    ))
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to={'/review'}><button className='add-btn'>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
