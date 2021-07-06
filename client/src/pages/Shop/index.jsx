import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import Cards from '../../components/Card';
import ToggleContainer from '../../components/Toggle-Container';
import API from '../../utils/API';

function Shop() {
    const [franchiseName, setFranchiseName] = useState('');
    const [franchise, setFranchise] = useState(0);
    const [itemList, setItemList] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        API.getOneFranchise(id)
            .then(() => {
                if (id === '1') {
                    setFranchiseName('Seinfeld')
                } else if (id === '2') {
                    setFranchiseName('Rick and Morty')
                } else if (id === '3') {
                    setFranchiseName('Home Improvement')
                } else if (id === '4') {
                    setFranchiseName('Family Guy')
                } else if (id === '5') {
                    setFranchiseName('The Office')
                } else {
                    setFranchiseName('All')
                }
            })
    }, [id]);

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
            <h2 style={{ paddingBottom: '12px' }}><span style={{ borderBottom: '3px solid black' }}>Shows</span></h2>
            <ToggleContainer franchiseSelected={franchise} />
            <h2 style={{ textAlign: 'center', paddingTop: '12px', borderBottom: '3px solid black' }}>Products ({franchiseName}) </h2>
            <div className="row cardStyle">
                {itemList.map((item, i) => (
                    <div className="row d-flex justify-content-center" style={{ paddingBottom: '12px', paddingTop: '12px' }}>
                        <div className="col-sm-4">
                            <Cards key={i} {...item} />
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Shop
