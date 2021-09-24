import React from "react";
import { Route, Switch } from "react-router-dom";
import Cart from "../Cart/Cart";
import Products from "../Products/Products";
import Signup from "../Signup/Signup";

const Routes = ({productItems, cartItems}) => {
    return <div>
        <Switch>
            <Route path="/" exact>
                <Products productItems={productItems}/>
            </Route>
            <Route path="/signup" exact>
                <Signup/>
            </Route>
            <Route path="/cart" exact>
                <Cart cartItems={cartItems}/>
            </Route>
        </Switch>
    </div>
}
  

export default Routes;

