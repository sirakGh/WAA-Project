
import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AdminSellers from '../../containers/Admin/Sellers/Sellers';


const useStyles = makeStyles((theme) => ({
    
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
}));

const Sellers = () => {
    const classes = useStyles();

    return (<div><h1>Sellers Page</h1>
        {/* Sellers */}
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <AdminSellers/>
            </Paper>
        </Grid></div>)
}

export default Sellers;