import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import api from '../../configuration/api'
import CardContent from '@material-ui/core/CardContent';
import ShoppingCart from '../../containers/ShoppingCart/ShoppingCart';
import Reviews from '../../containers/Reviews/Reviews';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { authenticationService } from '../../services/authentication.service';
import Products from '../../pages/seller/products';
import Header from '../front/Header/Header';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Your Website
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
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

export default function ProductDetail(props) {
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [product, setProduct] = useState();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    function fetchProductDetail() {
        api.get('products/' + props.productId)
            .then(function (response) {
                console.log("resp", response.data)
                setProduct(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const addtoCart = () => {
        console.log("shopping cart method")
        api.get('buyers/'+authenticationService.currentUserValue.userId+ '/shoppingcart')
            .then(function (response) {
                let products = response.data;
                products.push(product);
                api.patch('buyers/' + authenticationService.currentUserValue.userId + '/shoppingcart', products)
            })
            .then(function (response) {
                console.log("resp", response.data)
                setRefresh(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        
        
    }

    useEffect(fetchProductDetail, [])

    useEffect(fetchProductDetail, [refresh])

    return (
        <>
        <Header/>
            <main >
                <Container maxWidth="lg" className={classes.container}>
                     <ShoppingCart checkAgain={refresh} />
                            
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Reviews productId = {props.productId}/>
                            </Paper>
                        </Grid>
            
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
       
        </>
    );
}