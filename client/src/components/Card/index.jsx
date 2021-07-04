import React from 'react'
import { Container, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Cards = ({ image_link, product_name, fake_price, fake_quantity, fake_sold, id, description }) => {
    const history = useHistory();
    const redirect = () => {
        history.push(`/products/${id}`)
    }

    return (
        <Container onClick={redirect}>
            <Card.Title>{product_name}</Card.Title>
            <Card style={{ width: '18rem' }}>
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