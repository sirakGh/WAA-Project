import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingCartProducts from '../ShoppingCartProducts/ShoppingCartProducts';
import Addresses from '../Addresses/Addresses';
import { Button } from '@material-ui/core';
import api from '../../configuration/api'
import { authenticationService } from '../../services/authentication.service';
import cogoToast from 'cogo-toast';

export const ShoppingContext = React.createContext({});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


const ShoppingCart = (props) => {

    const [orderAddress, setOrderAddress] = useState({
        shipping: null,
        billing: null
    })

    const [checkout, setCheckout] = useState(true);
    // const [newAddressForm, setNewAddressForm] = useState(false);
    // const [newAddressSameBilling, setNewAddressSameBilling] = useState(true);

    const order = () => {
        api.post("buyers/"+authenticationService.currentUserValue.userId+"/shoppingcart/process",{shippingAddress: orderAddress.shipping, billingAddress: orderAddress.billing})
        .then((response) => {
            cogoToast.success("Successfully Ordered!");
        })
        // console.log(orderAddress);
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ShoppingContext.Provider value={{orderAddress, setOrderAddress,checkout, setCheckout}}>
                {props.checkAgain}
                <ShoppingCartProducts checkout={checkout} order={()=>order} />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Addresses</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Addresses />
                    </AccordionDetails>
                </Accordion>
                
            </ShoppingContext.Provider>
        </div>
    );
}
export default ShoppingCart;
