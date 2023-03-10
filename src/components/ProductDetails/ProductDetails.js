import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const product = fakeData.find(item => item.key === productKey);

    return (
        <div>
            <h1> Product Details</h1>
            <Product product={product} ShowAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetails;