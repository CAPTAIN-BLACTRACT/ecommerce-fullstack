import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";

function App(){
  const {cartItems,setCartItems}= useState<any[]>([]);
  const totalCartItems = cartItems.reduce((acc,item)=>acc+item.quantity,0);

  return(
    <div className="App">
      <Header cartItemCount={totalCartItems} />
      <main className="app-content" >
        {}
        <p>Content goes here....</p>
      </main>
    </div>
  );
}

export default App;
