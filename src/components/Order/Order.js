import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import api from '../../configuration/api'
import MUIDataTable from "mui-datatables";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Field, Form, Formik } from 'formik'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const OrderComponent = (props) => {

    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [orderId, setOrderId] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const { user } = useSelector(state => state.user)



    const handleClose = () => {
        setOpen(false);
    };

    const handleAddModal = () => {
        setOpen(true)
        setEditMode(false)

    }



    function fetchOrdersByProduct() {
        console.log("user", user)
        setLoading(true);
        setError(null);
        api.get('products/' + props.productId + '/orders')
            .then(function (response) {
                setOrders(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });

    }

    useEffect(fetchOrdersByProduct, []);

    useEffect(fetchOrdersByProduct, [refresh]);

    function HandleDeliverStatus(id) {
        api.patch('orders/' + id + '/deliver')
            .then(function (response) {
                fetchOrdersByProduct()
                setOpen(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });
    }
    function HandleShipStatus(id) {
        api.patch('orders/' + id + '/ship')
            .then(function (response) {
                fetchOrdersByProduct()
                setOpen(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });
    }
    function HandleCancelStatus(id) {
        api.patch('orders/' + id + '/cancel')
            .then(function (response) {
                fetchOrdersByProduct()
                setOpen(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });
    }

    const options = {
        selectableRows: true,
        selectableRowsOnClick: true,
        onRowClick: handleRowClick
    };

    function handleRowClick() {
        console.log("Row clicked")
    }

    function redirectToOrders(id) {
        console.log("h", id)
    }

    const columns = [
        { name: "id", label: "ID", options: { display: "excluded" } },
        {
            name: "status"
        },
        {
            name: 'Actions',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <>
                        <button onClick={() => {
                            HandleDeliverStatus(tableMeta.rowData[0], true)
                            console.log(tableMeta.rowData[0])
                        }}>
                            Deliver
                    </button>
                        <button onClick={() => {
                            HandleShipStatus(tableMeta.rowData[0])
                            console.log(tableMeta.rowData[0])
                        }}>
                            Ship
                    </button>
                        <button onClick={() => {
                            HandleCancelStatus(tableMeta.rowData[0])
                            console.log(tableMeta.rowData[0])
                        }}>
                            Cancel
                    </button>
                    </>;

                },
            }
        },

    ]

    return (
        <div style={{"width":"100%"}}>
            <MUIDataTable title={'Orders'} data={orders} columns={columns} options={options} />
        </div>

    );


}
export default OrderComponent;