import React, { useState, useEffect } from 'react';
import api from '../../configuration/api';
import ShoppingCartProduct from '../../components/ShoppingCartProduct/ShoppingCartProduct'
import { authenticationService } from '../../services/authentication.service';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ShoppingCartProducts = (props) => {

  
    
    const [totalPrice, setTotalPrice] = useState(0);

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [checkout, setCheckout] = useState(false);
    console.log(checkout)
    function removeFromCartDynamically(item){
        let prod = products;
        prod.quantity -= prod.quantity;

        api.get('buyers/'+authenticationService.currentUserValue.userId+ '/shoppingcart')
            .then(function (response) {
                var idx = response.data.findIndex(p => p.id==item.id);
               
                let products = response.data.splice(idx,1);
                api.patch('buyers/' + authenticationService.currentUserValue.userId + '/shoppingcart', response.data)
            })
            
        setProducts(prod)
    }
    function addToCartDynamically(item){
        let prod = products;
        console.log(item)
        prod.push(item);


        api.get('buyers/'+authenticationService.currentUserValue.userId+ '/shoppingcart')
            .then(function (response) {
                let products = response.data;
                products.push(item);
                api.patch('buyers/' + authenticationService.currentUserValue.userId + '/shoppingcart', products)
            })
            .then(function (response) {
                console.log("resp", response.data)
                // setRefresh(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        setProducts(prod)
    }
    function fetchProducts() {
        setLoading(true);
        setError(null);
        api.get('buyers/'+authenticationService.currentUserValue.userId+'/shoppingcart')
            .then(function (response) {
                
                var groupBy = function(xs, key) {
                    return xs.reduce(function(rv, x) {
                      (rv[x[key]] = rv[x[key]] || []).push(x);
                      return rv;
                    }, {});
                  }
                  console.log(groupBy(response.data, "id"));
                  const grouped = groupBy(response.data, "id");
                  let quantified = [];
                  setCheckout(response.data.length > 0 ? true: false)
                  for(let key in grouped){
                     let elem = grouped[key][0];
                     elem.quantity = grouped[key].length;
                     quantified.push(elem);
                     
                     setTotalPrice(quantified.reduce((price,item) => price + item.quantity*item.price, 0));
                  }
                  setProducts(quantified)
                  
                // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                // console.log(error);
                setLoading(false)
                setError(error.message);
            });

    }

    useEffect(()=>{
        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateShoppingCart = (prods) => {
        api.patch('/buyers/'+authenticationService.currentUserValue.userId+'/shoppingcart',prods)
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
    const handleDelete = (id) => {
        updateShoppingCart(products.filter(product => product.id !== id))
    }

    const prds = products.map(product => {
        return (
            
            <ShoppingCartProduct 
            key={product.id} 
            name={product.name} 
            description={product.description}
            price={product.price}
            quantity={product.quantity}
            
            clickHandler={()=>{handleDelete(product.id)}}
            />
        )

    });

    let content = prds
    if (products.length > 0) {
        content = prds;
    }
    else if (error) {
        content = <p>{error}</p>;
    }
    else if (isLoading) {
        content = <p> Empty Cart...</p>;
    }
    let cartItems = products;
    return (
        <>
        <div className="cart-items">
            <h2 className="cart-items-header">Cart Items</h2>
            
            {cartItems.length === 0 &&
                (<div className="cart-items-empty">No items are added.</div>
                )}
            <div>
                
                {cartItems.map((product) => (
                    <ShoppingCartProduct 
                    key={product.id} 
                    name={product.name} 
                    description={product.description}
                    price={product.price}
                    quantity={product.quantity}
                    removeHandler = {() => {removeFromCartDynamically(product)}}
                    addHandler = {()=> {addToCartDynamically(product)}}
                    clickHandler={()=>{handleDelete(product.id)}}
                    />
                ))}
            </div>
                    <div className="cart-items-total-price-name">
                        Total ${totalPrice}
                        <div className="cart-items-total-price">
                            { checkout && 
                                <Link to="/buyer/orders" style={{ textDecoration: 'none' }}><Button  variant="contained" onClick={props.order()} color="success">  
                               Place Order </Button> </Link>
                            } 
                            &nbsp;&nbsp;&nbsp;
                        </div>
                        
                    </div>
        </div>
        {/* <div>{content}</div> */}
        </>
    );

}

export default ShoppingCartProducts;