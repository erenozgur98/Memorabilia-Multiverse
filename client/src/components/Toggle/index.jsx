import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

const Toggle = (props) => {
    const history = useHistory();

    const changeFranchise = (id) => {
        if (id === props.franchiseSelected) {
            history.push('/shop');
        } else {
            history.push(`/shop/${props.id}`);
        }
    };

    return (
        <div>
            <Container>
                <Button
                    className='btn btn-success'
                    id={props.id}
                    onClick={() => changeFranchise(props.id)}
                >
                    {props.name}
                </Button>
            </Container>
        </div >
    )
};

export default Toggle;
