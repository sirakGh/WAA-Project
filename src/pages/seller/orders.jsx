import React from 'react';
import OrderComponent from '../../components/Order/Order'

const Orders = (props) => {
    return (<OrderComponent productId={props.match.params.productId}/>)
}

export default Orders;