import React, { useState } from "react";
import "./Cart.css";

const Cart = ({ }) => {
    //total price calculator fuction
    
    const [cartItems, setCartItems] = useState([]);
    const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0);
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
        <div className="cart-items">
            <h2 className="cart-items-header">Cart Items</h2>
       
            {cartItems.length === 0 &&
                (<div className="cart-items-empty">No items are added.</div>
                )}
            <div>
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-items-list">
                        <img className="cart-items-image" src={item.image} alt={item.name}/>

            <div className="cart-items-name">
                        {item.name}
            </div> 
            <div className="cart-items-function">
                <button className="cart-items-add" onClick={() => handleAddProduct(item)}>+</button>
                <button className="cart-items-remove" onClick={() => handleRemoveProduct(item)}>-</button>
            </div>            
            <div className="cart-items-price">
            {item.quantity} * ${item.price}        
            </div>
              </div>
                ))}
            </div>
                    <div className="cart-items-total-price-name">
                        Total price
                        <div className="cart-items-total-price">
                            ${totalPrice}
                        </div>

                    </div>
        </div>
    );
}

export default Cart;
