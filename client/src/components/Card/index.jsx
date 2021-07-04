import React from 'react'
import { Container, Card, Button } from 'react-bootstrap';

const Cards = ({ image_link, product_name, fake_price, fake_quantity, fake_sold, id, description }) => {
    return (
        <Container>
            <Card style={{ width: '18rem' }}>
            <Card.Title>{product_name}</Card.Title>
                <Card.Img variant="top" src={image_link !== '-' ? image_link : 'https://via.placeholder.com/160'} />
                <Card.Body>
                    <Card.Text>
                        Price: ${fake_price}
                    </Card.Text>
                    <Card.Text>
                        Stock: {fake_quantity}
                    </Card.Text>
                    <Card.Text>
                        Sold: {fake_sold}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Cards;