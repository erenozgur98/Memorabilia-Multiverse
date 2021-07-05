import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import API from '../../utils/API';
import Toggle from '../Toggle';

function ToggleContainer({ franchiseSelected }) {
    const [franchiseData, setFranchiseData] = useState([]);

    useEffect(() => {
        API.getFranchises()
            .then(franchise => setFranchiseData(franchise.data))
    }, [])

    return (
        <Container className='d-flex justify-content-center'>
            {franchiseData.map((franchise) =>
                <Toggle
                    key={franchise.id}
                    name={franchise.name}
                    id={franchise.id}
                    franchiseSelected={franchiseSelected}
                />
            )}
        </Container>
    )
};

export default ToggleContainer;
