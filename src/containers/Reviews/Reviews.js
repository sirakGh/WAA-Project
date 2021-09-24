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

const Reviews = (props) => {

    const [reviews, setReviews] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState();
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    function fetchReviews() {
        setLoading(true);
        setError(null);
        api.get('products/' + props.productId + '/reviews')
            .then(function (response) {
                setReviews(response.data)
                console.log("reviews", response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });

    }

    function addReview(data) {
        //TODO
        console.log(data)
        api.post('buyers/' + authenticationService.currentUserValue.userId + '/products/' + props.productId + '/reviews',data)
            .then(function (response) {
                setRefresh(true)
                console.log("reviews", response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });

    }

    useEffect(fetchReviews, []);

    useEffect(fetchReviews, [refresh]);


    const prds = reviews.map(review => {
        return (
            <ReviewComponent
                key={review.id}
                name={review.content}
                id={review.id} />
        )

    });

    let content = prds
    if (reviews.length > 0) {
        content = prds;
    }
    else if (error) {
        content = <p>{error}</p>;
    }
    else if (isLoading) {
        content = <p> Loading ... </p>;
    }

    return (
        <div>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaper}>
                                {/* add review */}
                                <Formik
                                    initialValues={{ content: ' ' }}
                                    onSubmit={(values) => { addReview(values) }}
                                >

                                    <Form>

                                        <Grid container spacing={2}>
                                            <Grid item xs={9}>
                                                <Field name="content">
                                                    {({ field, form, meta }) => (
                                                        <TextField
                                                            autoComplete="content"
                                                            label="Review"
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
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Review
                    </Button>
                                        </Grid>
                                    </Form>

                                </Formik>
                            </Paper>
                        </Grid>
                        {/* Reviews */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaper}>
                                {content}
                            </Paper>
                        </Grid>


                    </Grid>
                </Container>
            </main>
        </div>
    );

}

export default Reviews;