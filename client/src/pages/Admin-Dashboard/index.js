import React from 'react';
import {
    Box,
    Link,
    Flex,
} from 'rebass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminTable from '../../components/Admin-Table'

function Admin() {
    return (
        <div>
            <Flex
            
             px={2}
             color='white'
             bg='black'
            alignItems='center' >
             <Box />
             <Link variant='nav' href='#!'>
             <FontAwesomeIcon icon="warehouse" />
                 {' '}
                 Inventory
             </Link>
             <Link variant='nav' href='#!'>
             <FontAwesomeIcon icon="chart-pie" />
                 {' '}
                 Sales by Franchise
             </Link>
             <Link variant='nav' href='#!'>
             <FontAwesomeIcon icon="dollar-sign" />
                 {' '}
                 All Sales
             </Link>
             <Link variant='nav' href='#!'>
             <FontAwesomeIcon icon="money-check" />
                 {' '}
                 Expenses
             </Link>
             <Link variant='nav' href='#!'>
             <FontAwesomeIcon icon="chart-line" />
                 {' '}
                 Net Revenue
             </Link>
            </Flex> 
            <Box>
            <AdminTable/>
            </Box>
        </div>
    )
}

export default Admin;