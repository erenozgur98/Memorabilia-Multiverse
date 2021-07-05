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

    const something = () => {
        // just to fix console error
    };

    return (
        <div>
            <Container>
                <Form>
                    <Form.Check
                        type='radio'
                        id={props.id}
                        label={props.name}
                        checked={props.franchiseSelected === props.id}
                        onChange={something}
                        onClick={() => changeFranchise(props.id)}
                    />
                </Form>
            </Container>
        </div >
    )
};

export default Toggle;
