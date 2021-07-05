import React, { useContext, useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap';
import { useHistory, } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../utils/API';
import CartContext from '../../utils/CartContext';

toast.configure();

const Cards = ({ image_link, product_name, fake_price, fake_quantity, fake_sold, id, description }) => {
    const cart = useContext(CartContext);
    const [item, setItem] = useState({});

    const history = useHistory();

    useEffect(() => {
        // find another way to add to cart without useEffect
        API.getOneItem(id)
            .then(item => {
                setItem(item.data)
            })
    }, [id])

    const redirect = () => {
        history.push(`/products/${id}`)
    }

    const addToCart = () => {
        toast.info('The item has been added to your cart!', {
            autoClose: 2500,
        });
    };

    return (
        <Container>
            <Card style={{ width: '14rem' }}>
                <Card.Img onClick={redirect} variant="top" src={image_link !== '-' ? image_link : 'https://via.placeholder.com/160'} />
                <Card.Body>
                    <Card.Title>{product_name}</Card.Title>
                    <Card.Text>
                        Price: ${fake_price}
                    </Card.Text>
                    <Button
                        className='btn btn-primary'
                        onClick={() => {
                            addToCart()
                            cart.addItem(item)
                        }}
                    >
                        Add To Cart
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Cards;