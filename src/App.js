import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/index'
import Admin from './pages/admin';
import SellerP from './pages/seller';
import Buyer from './pages/buyer';
import SellerPage from './pages/common/seller-page';
import ProductPage from './pages/common/product-page';
import Login from './pages/common/login';
import Register from './pages/common/register';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import {Role} from './helpers/role'
import Cart from './components/front/Cart/Cart'
import { useState } from 'react';
import api from './configuration/api'
import Header from './components/front/Header/Header';
import { authenticationService } from './services/authentication.service';

function App() {
  let data = [];
  // const [cartItems, setCartItems] = useState(data);
  let cartItems = [];
 
 
 


  function setCartItems(data){
    console.log('called')
    cartItems = data;
  }
 
  const handleAddProduct = (product) =>{
  const ProductExist = cartItems.find((item)=> item.id === product.id);
  
    if(ProductExist){
      setCartItems(cartItems.map((item)=>item.id === product.id ?
      {...ProductExist, quantity: ProductExist.quantity + 1}:item)
      );
    }
    else{
      setCartItems([...cartItems, {...product, quantity:1}])
    }
  };

  const handleRemoveProduct = (product) =>{
    const ProductExist = cartItems.find((item)=> item.id === product.id);
    if(ProductExist.quantity === 1){
      setCartItems(cartItems.filter((item) => item.id !==product.id));
    }
    else{
      setCartItems(cartItems.map((item)=>item.id === product.id? {...ProductExist, quantity: ProductExist.quantity -1}:item));
    }
  };

  const handleCartClearance = () =>{
    setCartItems([]);
  }
  
  return (
    
    <BrowserRouter>

      <Switch>
        
      
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
        <PrivateRoute path="/seller" roles={[Role.Seller]} component={SellerP} />
        <PrivateRoute path="/buyer" roles={[Role.Buyer]} component={Buyer} />
        <Route path="/sellers/:id" component={SellerPage} />
        <Route path="/products/:id" component={ProductPage} />
        <Route exact path="/" component={Home} />
        <Route path="/cart" exact>
                <Cart cartItems={cartItems} 
                handleAddProduct={handleAddProduct} 
                handleRemoveProduct={handleRemoveProduct}
                handleCartClearance={handleCartClearance}/>
            </Route>
        <Route><h1>404 Not Found</h1></Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
