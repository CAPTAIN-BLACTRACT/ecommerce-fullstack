import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

import "./App.css";
import { Product } from "./types/Product";

interface CartItem{

    _id: string;
    name: string;
    price: number;
    quantity:number;

}

function App(){
  const [cartItems , setCartItems] = useState<CartItem[]>([]);
  const totalCartItems = cartItems.reduce((acc,item)=>acc+item.quantity,0);

  const handleAddToCart =  (productToAdd : Product)=>{
    setCartItems((prevItems)=>{
      const existingItem = prevItems.find(item=>item._id===productToAdd._id);

      if(existingItem)
      {
        return prevItems.map(item=>
          item._id===productToAdd._id ? {...item, quantity:item.quantity+1} : item
        );
      } 
      else{
        return [...prevItems,{
          _id: productToAdd._id,
          name: productToAdd.name,
          price: productToAdd.price,
          quantity: 1
        }];
      }
    });
  };
  return(
    <Router>{}
    <div className="App">
      <Header cartItemCount={totalCartItems} />
      <main className="app-content" >
        {}
        <p>Content goes here....</p>
      </main>
    </div>
    </Router>
  );
}

export default App;
