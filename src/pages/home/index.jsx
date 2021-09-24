import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Products from '../../components/front/Products/Products'
import { authenticationService } from '../../services/authentication.service';
import { Role } from '../../helpers/role';
import Orders from '../buyer/orders';
import Header from '../../components/front/Header/Header'
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
    </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    link: {
        zIndex: 'right',
        justify: "space-between",
        margin: theme.spacing(1, 1.5),
        float: 'left'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));



export default function Home() {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            if (authenticationService.currentUserValue.role === Role.Admin) {
                history.push("/admin/sellers")
            }
            if (authenticationService.currentUserValue.role === Role.Seller) {
                history.push("/seller/products")
            }
        }
    }, [])
    const redirectToSignup = () => {
        history.push("/register")
    }
    const redirectToLogin = () => {
        history.push("/login")
    }



    return (
        <React.Fragment>
            <CssBaseline />
            <Header> </Header>
           

            <Switch>
                <Route path="/buyer/orders" component={Orders} />
                <Route path="/"><main>
                    {/* Hero unit */}

                    <Products />

                </main></Route>
            </Switch>

           
        </React.Fragment>
    );
}
