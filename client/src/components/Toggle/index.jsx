import React from 'react'
import { Container, Form } from 'react-bootstrap'
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
                    <Form.Check
                        type='radio'
                        id={props.id}
                        label={props.name}
                        checked={props.franchiseSelected === props.id}
                        onClick={() => changeFranchise(props.id)}
                    />
            </Container>
        </div >
    )
};

export default Toggle;
