import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    float: "left",
    padding: "5px"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ShoppingCartProduct(props) {
  const classes = useStyles();
  const item = props;


  return (
    <>
    <div key={item.id} className="cart-items-list">
                        <img className="cart-items-image" src="https://via.placeholder.com/150/0000FF/808080?Text=Product" alt={item.name}/>

            <div className="cart-items-name">
                        {item.name}
            </div> 
            <div className="cart-items-function">
                <button className="cart-items-add" onClick={props.addHandler}>+</button>
                <button className="cart-items-remove" onClick={props.removeHandler}>-</button>
            </div>            
            <div className="cart-items-price">
              {item.quantity} * ${item.price}        
            </div>
              </div>
    {/* <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={props.name}
        subheader={"Price: USD "+props.price}
      />
      <CardMedia
        className={classes.media}
        image="https://via.placeholder.com/150/0000FF/808080?Text=Product"
      />
      <CardContent>
        {props.description}.
        This is a nice product. You'll enjoy this. Believe me.
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={props.clickHandler}  aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card> */}
    </>
  );
}
