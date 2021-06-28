import { useState, useEffect } from 'react';
import {
    Box,
    Flex,
} from 'rebass';
import React from 'react';
import Toggle from '../Toggle';
import API from '../../utils/API';
import './style.css';


const ToggleContainer = ({franchiseSelected}) => {

// function ToggleContainer(props) {
    // state = { franchiseData: [{id: 1, name: "Seinfeld", logo: "text"}, {id: 2, name: "Rick and Morty", logo: "morty"}] }
    const [franchiseData, setFranchiseData] = useState([]);
    useEffect(()=>{
        API.getFranchises()
        .then(franchise=>setFranchiseData(franchise.data))
    }, [])

        return ( 
            <Box className="toggle">
                <Flex>
                    <Box>
                       
                        {franchiseData.map((franchise) =>
                        <Toggle key={franchise.id}
                        name={franchise.name}
                        id={franchise.id}
                        franchiseSelected={franchiseSelected}
                        /> 
                        
                        )}
                     
                    </Box>
                </Flex>
            </Box>
         );
    }
 
export default ToggleContainer;