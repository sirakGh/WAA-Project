import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import api from '../../configuration/api'
import MUIDataTable from "mui-datatables";
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
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
import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router';
import { authenticationService } from '../../services/authentication.service';
// import { history } from '../../helpers/history';

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

const SellerComponent = () => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [productId, setProductId] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const { user } = useSelector(state => state.user)
    const history = useHistory();

    const handleEditModal = (id) => {
        setProductId(id)
        api.get('products/' + id)
            .then(function (response) {
                console.log("resp", response.data)
                setProduct(response.data)
                setEditMode(true)
                console.log("product", product)
                console.log(JSON.stringify(response.data));
                setOpen(true);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });


    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddModal = () => {
        setOpen(true)
        setEditMode(false)

    }



    function fetchProductsBySeller() {
        console.log("user", user)
        setLoading(true);
        setError(null);
        api.get('sellers/'+authenticationService.currentUserValue.userId+'/products')
            .then(function (response) {
                setProducts(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });

    }

    useEffect(fetchProductsBySeller, []);

    useEffect(fetchProductsBySeller, [refresh]);

    function editProduct(data) {
        api.patch('products/' + productId, data)
            .then(function (response) {
                cogoToast.success('Product successfuly Edited!');
                fetchProductsBySeller()
                setOpen(false)
            })
            .catch(function (error) {
                console.log(error);
                cogoToast.error('Something went wrong! Please try, Again');
            });
    }
    function AddProduct(data) {
        console.log("Add", data)
        api.post('sellers/' + authenticationService.currentUserValue.userId + '/products', data)
            .then(function (response) {
                console.log("Product Added")
                cogoToast.success('Product successfuly Added!');
                fetchProductsBySeller()
                setOpen(false)
            })
            .catch(function (error) {
                console.log(error);
                cogoToast.error('Something went wrong! Please try, Again');
            });
    }
    function DeleteProduct(id) {
        console.log("Delete", id)
        api.delete('products/' + id)
            .then(function (response) {
                cogoToast.success('Product successfuly Added!');
                fetchProductsBySeller()
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                cogoToast.error('Something went wrong! Please try, Again');
            });
    }

    const options = {
        // selectableRows: true,
        // selectableRowsOnClick: true,
        // onRowClick: handleRowClick
    };

    function handleRowClick() {
        console.log("Row clicked")
    }

    function redirectToOrders(id) {
        history.push("/seller/orders/"+id)
    }

    const columns = [
        { name: "id", label: "ID", options: { display: "excluded" } },
        {
            name: "name"
        },
        {
            name: "description"
        },
        {
            name: "price"
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
                            handleEditModal(tableMeta.rowData[0], true)
                            console.log(tableMeta.rowData[0])
                        }}>
                            Edit
                    </button>
                        <button onClick={() => {
                            DeleteProduct(tableMeta.rowData[0])
                            console.log(tableMeta.rowData[0])
                        }}>
                            Delete
                    </button>
                        <button onClick={() => {
                            redirectToOrders(tableMeta.rowData[0])
                            console.log(tableMeta.rowData[0])
                        }}>
                            Orders
                    </button>
                    </>;

                },
            }
        },

    ]

    return (
        <>
        <div style={{"width":"100%"}}>




            <MUIDataTable title={<div>
               


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            handleAddModal()

                        }}
                    >
                        New Product
                </Button>
            </div>} data={products} columns={columns} options={options} />

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Product
                </Typography>


                            <Formik
                                initialValues={{ name: editMode ? product.name : '', description: editMode ? product.description : '', price: editMode ? product.price : '' }}
                                onSubmit={(values) => { editMode ? editProduct(values) : AddProduct(values) }}
                            >
                                <Form>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field name="name">
                                                {({ field, form, meta }) => (
                                                    <TextField
                                                        autoComplete="name"
                                                        label="Product Name"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        autoFocus
                                                        {...field}
                                                        type="text"
                                                    />
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="description">
                                                {({ field, form, meta }) => (
                                                    <TextField
                                                        autoComplete="description"
                                                        label="Product Description"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        autoFocus
                                                        {...field}
                                                        type="text"
                                                    />
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="price">
                                                {({ field, form, meta }) => (
                                                    <TextField
                                                        autoComplete="price"
                                                        label="Price"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        autoFocus
                                                        {...field}
                                                        type="number"
                                                    />
                                                )}
                                            </Field>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            {editMode ? 'Edit Product' : 'Add Product'}
                                        </Button>
                                    </Grid>


                                </Form>

                            </Formik>
                        </div>
                    </Container>
                </Modal>
            </div>
        </div>
</>

    );


}
export default SellerComponent;