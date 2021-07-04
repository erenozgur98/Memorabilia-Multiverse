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
                {/* <label className='d-flex' > */}
                    {/* <span className='pr-2'>Label</span> */}
                    <Form.Check
                        type='radio'
                        id={props.id}
                        label={props.name}
                        checked={props.franchiseSelected === props.id}
                    />
                {/* </label> */}
            </Container>
        </div >
    )
}

export default Toggle;
