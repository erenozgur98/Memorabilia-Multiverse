import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import API from '../../utils/API';

const ProductPage = () => {
    const [item, setItem] = useState([]);
    const { ItemId } = useParams();

    useEffect(() => {
        API.getOneItem(ItemId)
            .then(response => setItem(response.data))
    }, [ItemId])

    return (
        <div>
            <div className="container">
                <div className="title">{item.product_name}</div>
                <div className="grid">
                    <img src={item.image_link} className="image" alt="Product"></img>
                    <div className="row">
                        <div className="info">
                            <div className="price">Price:{' '}{item.fake_price}</div>
                            <div>Stock:{' '}{item.fake_quantity} </div>
                            <div>Sold:{' '}{item.fake_sold} </div>
                        </div>
                    </div>
                    <div className="description">{item.fun_description}</div>
                    <div className="row">
                            {/* <button onClick={() => cart.addItem(item)}>Add to Cart</button> */}
                            <button type='submit'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
