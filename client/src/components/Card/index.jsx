import React from 'react'
import { Container, Card, Button } from 'react-bootstrap';

const Cards = ({ image_link, product_name, fake_price, fake_quantity, fake_sold, id, description }) => {
    return (
        <Container>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image_link !== '-' ? image_link : 'https://via.placeholder.com/160'} />
                <Card.Body>
                    <Card.Title>{product_name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Cards;
