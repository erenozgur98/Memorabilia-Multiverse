import React from 'react';
import {
    Box,
    Button,
} from 'rebass';
import './style.css'
import ConsumerTable from '../../components/Consumer-Table'


function Consumer() {
    return (
        <div className="container">

            <ConsumerTable />
            {/* <Box className="dashcards">
                <Button>
                    <h2><a className="dash" href="/cart">Shopping Cart</a></h2>
                </Button>
            </Box>
            <Box className="dashcards2">
                <Button>
                    <h2><a className="dash" href="/client-dashboard">Your Orders</a></h2>
                </Button>
            </Box> */}
        </div>
    )
}

export default Consumer;