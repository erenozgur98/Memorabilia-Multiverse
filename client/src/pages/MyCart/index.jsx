import React, { useContext, useEffect, useState } from 'react'
import API from '../../utils/API';
import CartContext from '../../utils/CartContext';
import { Redirect } from "react-router";

const MyCart = ({ user }) => {
    const cart = useContext(CartContext)
    const [cartTotal, setCartTotal] = useState(0);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        console.log(cart);
        let total = 0;
        if (!cart.items.length) return;

        for (let i = 0; i < cart.items.length; i++) {
            total += parseFloat(cart.items[i].fake_price);
        };

        setCartTotal(total);

    }, [cart])

    const handleCheckOut = async (e) => {
        e.preventDefault();

        if (!user.username) return setRedirect(true);

        // if (!cart.items.length) {
        //     toast.warn('There are no items in your cart!', {
        //         autoClose: 2500
        //     });
        // } else {
        //     toast.info('Checkout has been successfull!', {
        //         autoClose: 2500
        //     });
        //     localStorage.clear();
        //     setTimeout(() => {
        //         window.location.reload()
        //     }, 2500)
        // }

        try {
            const purchaseArr = cart.items.map((item) => item)
            console.log(purchaseArr);

            for (let i = 0; i < purchaseArr.length; i++) {
                API.create(purchaseArr[i]);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const emptyCart = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className='cart'>
            {redirect && <Redirect to='/login' />}
            <h1>My Cart</h1>
            {cart.items.map((item, i) => (
                <p>{item.product_name} = ${item.fake_price}</p>
            ))}
            <h3>Total: ${parseFloat(cartTotal)}</h3>
            <button className='btn btn-primary' onClick={handleCheckOut}>Checkout</button>
            <button className='btn btn-primary' onClick={emptyCart}>Empty Cart</button>
        </div>
    )
}

export default MyCart;
