import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'
import { clearLocalShoppingCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    clearLocalShoppingCart();
                    alert('Your order placed successfully')
                }
            })
    }

    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

            <input defaultValue={loggedInUser.displayName} {...register("name", { required: true })} placeholder='Your Name' />
            {errors.name && <span className='error'>Name is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder='Your Email' />
            {errors.email && <span className='error'>Email is required</span>}

            <input {...register("address", { required: true })} placeholder='Your Address' />
            {errors.address && <span className='error'>Address is required</span>}

            <input {...register("phone", { required: true })} placeholder='Your Phone Number' />
            {errors.phone && <span className='error'>Phone Number is required</span>}


            <input type="submit" />
        </form>
    );
};

export default Shipment;