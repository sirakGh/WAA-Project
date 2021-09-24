import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom"; 
import { authenticationService } from "../../../services/authentication.service";
import "./Header.css";

import {  Route, Switch, useHistory } from 'react-router-dom';

const Header = () =>{
    const history = useHistory();
    const redirectToSignup = () => {
        history.push("/register")
    }
    const redirectToLogin = () => {
        history.push("/login")
    }
    return(
            <header className="header" >
                <div>
                    <h1>
                        <Link to="/" className="logo">
                            Online Minimarket
                        </Link>
                    </h1>
                </div>
                
       
                           
                <div className="header-links">
                    <ul>
                        <li> 
                        {authenticationService.currentUserValue && <div> Welcome, &nbsp; 
                        
                        { authenticationService.currentUserValue.username}<Link onClick={() => {
                               authenticationService.logout()
                               history.push("/")
                           }} >
                               Logout
                   </Link>
       
                               <Link onClick={() => {
                                   history.push("/buyer/orders")
                               }} >
                                   Your Orders
                   </Link>
       
                           </div>}
                            </li>
                        <li>
                            
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                    
                    <ul>
                        <li>
                            {!authenticationService.currentUserValue && <div><Link onClick={redirectToLogin} color="inherit" variant="outlined" >
                               Login
                 </Link>
                               <Link onClick={redirectToSignup} color="inherit" variant="outlined" >
                                   Sign Up
                                                 </Link>
                                                 </div>}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to={authenticationService.currentUserValue?.userId ? "/products/1": "/login"} className="cart">
                            <i class="fas fa-shopping-cart"></i>
                            </Link>
                        </li>
                    </ul>
                   
                </div>
            </header>

    );
}
export default Header;
