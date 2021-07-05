import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import Cards from '../../components/Card';
import ToggleContainer from '../../components/Toggle-Container';
import API from '../../utils/API';

function Shop() {
    const [franchise, setFranchise] = useState(0);
    const [itemList, setItemList] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            API.getOneFranchise(id)
                .then((list) => {
                    setItemList(list.data)
                    setFranchise(parseInt(id))
                });
        } else {
            API.getAll()
                .then((list) => {
                    setItemList(list.data)
                    setFranchise('0')
                });
        }
    }, [id]);

    return (
        <Container style={{ textAlign: 'center' }}>
            <ToggleContainer franchiseSelected={franchise} />
            <div className="row cardStyle">
                {itemList.map((item, i) => (
                    <div className="col-sm-4">
                        <Cards key={i} {...item} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Shop
