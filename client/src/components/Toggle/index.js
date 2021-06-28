import {
    Box,
} from 'rebass';
import React from 'react';
import { Label, Radio } from '@rebass/forms';
import './style.css';
import { useHistory } from 'react-router-dom';

const Toggle = (props) => {

    const history = useHistory();


    const changeFranchise = (id) => {
        if (id === props.franchiseSelected) history.push('/shop')
        else history.push('/shop/' + props.id)
    }

    return (
         <>
        <Box className="switch">
            <Label p={2} onClick={ () => changeFranchise(props.id)} >
            <Radio className="radio"
                name={props.name}
                id={props.id}
                checked= {props.franchiseSelected === props.id}
                />
            {props.name}
            </Label>
        </Box> 
        </> 
     );

}

export default Toggle;