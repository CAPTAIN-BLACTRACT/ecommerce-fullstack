import React from "react";
import "./Header.css";

interface HeaderProps{
    cartItemCount : number;
}

const Header: React.FC<HeaderProps> = ({cartItemCount}) => {

    return(
        <header className="app-header">
            <h1>E-commerce catalouge</h1>
            <nav>
                <a href="/">Products</a>
                <span className="cart-summary">Cart ({cartItemCount})</span>
            </nav>
        </header>
    );
};

export default Header ;