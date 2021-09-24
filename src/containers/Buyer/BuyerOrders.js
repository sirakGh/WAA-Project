import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import api from '../../configuration/api'
import ReviewComponent from '../../components/Review/ReviewComponent'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import { Field, Form, Formik } from 'formik'
import Paper from '@material-ui/core/Paper';
import MUIDataTable from "mui-datatables";
import { authenticationService } from '../../services/authentication.service';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const BuyerOrders = (props) => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState();
    const classes = useStyles();




    function fetchOrdersByBuyer() {
        setLoading(true);
        setError(null);
        api.get('buyers/' + authenticationService.currentUserValue.userId + '/orders')
            .then(function (response) {
                setOrders(response.data)
                console.log("buyerOrders", response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    useEffect(fetchOrdersByBuyer, []);

    useEffect(fetchOrdersByBuyer, [refresh]);

    const columns = [
        {
            name: "id"
        },
        {
            name: "status"
        }

    ]



    return (
        <MUIDataTable title={'Your Orders'} data={orders} columns={columns} />
    );

}

export default BuyerOrders;