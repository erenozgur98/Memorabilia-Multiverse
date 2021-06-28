import { format } from 'date-fns'

export const COLUMNS =

    [
        {
            Header: 'Order #',
            accessor: 'id'
        },
        {
            Header: 'Product #',
            accessor: 'product_id'
        },
        {
            Header: 'Franchise #',
            accessor: 'franchise_id'
        },
        {
            Header: 'Quantity',
            accessor: 'quantity'
        },
        // {
        //     Header: 'Created At',
        //     accessor: 'createdAt'
        //     ,
        //     Cell: ({ value }) => 
        //     {
        //         return format(new Date({value}.toString()), 'dd/MM/yyyy')
        // }
        // },
        {
            Header: 'Price',
            accessor: 'price',
            Cell: ({ value }) => {
                return parseFloat(value)
            }
        }
        // ,{
        //     Header: 'User Id',
        //     accessor: 'user_id'
        // }
    ]

// updatedAt: "2020-11-08T08:02:06.000Z"  //not included


// createdAt: "2020-11-08T08:02:06.000Z"
// franchise_id: 1
// price: "55.54"
// quantity: 1
// product_id: 1
// user_id: 1
// id: 1
