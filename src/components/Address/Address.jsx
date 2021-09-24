import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
});

export default function Address(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} onClick={props.clicked}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.city}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.state}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.country}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.zipCode}
                </Typography>
            </CardContent>
        </Card>
    );
}