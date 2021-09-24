import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



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

const Product = (props) => {

    const classes = useStyles();



    return (
        <React.Fragment>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={ props.image }
                                title="Image title" 
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.title}
                                </Typography>
                                <Typography>
                                    {props.description}
                                </Typography>
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            </Container>








        </React.Fragment>
    )
}

export default Product;