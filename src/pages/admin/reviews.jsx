import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AdminReviews from '../../containers/Admin/Reviews/Reviews';


const useStyles = makeStyles((theme) => ({
    
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
}));

const Reviews = () => {
    const classes = useStyles();
    return (<div><h1>Reviews Page</h1>
        {/* Sellers */}
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <AdminReviews/>
            </Paper>
        </Grid></div>)
}

export default Reviews;