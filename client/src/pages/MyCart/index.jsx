import React, { useContext, useEffect, useState } from 'react'
import API from '../../utils/API';
import CartContext from '../../utils/CartContext';
import { Redirect } from "react-router";
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const MyCart = ({ user }) => {
    const cart = useContext(CartContext)
    const [cartTotal, setCartTotal] = useState(0);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let total = 0;
        if (!cart.items.length) return;

        for (let i = 0; i < cart.items.length; i++) {
            total += parseFloat(cart.items[i].fake_price);
        };

        setCartTotal(total);

    }, [cart]);

    const handleCheckOut = async (e) => {
        e.preventDefault();

        if (!user.username) return setRedirect(true);

        if (!cart.items.length) {
            toast.warn('There are no items in your cart!', {
                position: 'top-right',
                autoClose: 2500,
                closeOnClick: true,
                draggable: true,
                pauseOnHover: true,
                hideProgressBar: false,
            });
        } else {
            toast.info('Checkout has been successfull!', {
                position: 'top-right',
                autoClose: 2500,
                closeOnClick: true,
                draggable: true,
                pauseOnHover: true,
                hideProgressBar: false,
            });
            localStorage.clear();
            setTimeout(() => {
                window.location.reload()
            }, 2500)
        }

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
        toast.info('Clearing cart', {
            setTimeout: 1500,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
            hideProgressBar: true,
        });
        setTimeout(() => {
            localStorage.clear();
            window.location.reload();
        }, 1520)
    };

    return (
        <div>
            {redirect && <Redirect to='/login' />}
            <Container className='d-flex justify-content-center'>
                <Card className='cart' style={{ width: '118rem', height: '30rem' }}>
                    <Card.Body className='card-body'>
                        <Card.Title>My Cart</Card.Title>
                        <Card.Text>
                            {cart.items.map((item) => (
                                <p>{item.product_name} = ${item.fake_price}</p>
                            ))}
                        </Card.Text>
                        <Card.Text>Total: ${parseFloat(cartTotal)}</Card.Text>
                        <Button onClick={handleCheckOut}>Checkout</Button>
                        {' '}
                        <Button onClick={emptyCart}>Empty Cart</Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default MyCart;
