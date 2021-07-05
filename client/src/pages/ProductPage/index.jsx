import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import API from '../../utils/API';
import CartContext from '../../utils/CartContext';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const ProductPage = () => {
    const cart = useContext(CartContext);
    const [item, setItem] = useState({});
    const { ItemId } = useParams();

    useEffect(() => {
        API.getOneItem(ItemId)
            .then(item => {
                setItem(item.data)
            })
    }, [ItemId]);

    const addToCart = () => {
        toast.info('The item has been added to your cart!', {
            autoClose: 2500,
        });
    };

    return (
        <div>
            <Container className="container d-flex justify-content-center">
                <Card className='product-card' style={{ width: '18rem', textAlign: 'center' }}>
                    <Card.Title>{item.product_name}</Card.Title>
                    <Card.Img variant="top" src={item.image_link} />
                    <Card.Body>
                        <Card.Text>
                            {item.fun_description}
                        </Card.Text>
                        <Card.Text>
                            ${item.fake_price}
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
        </div>
    )
}

export default ProductPage;