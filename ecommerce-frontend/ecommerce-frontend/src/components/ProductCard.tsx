import React from "react";
import { Product } from "../types/Product";
import './ProductCard.css';
import { Link } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { classicNameResolver } from "typescript";

interface ProductCardProps{
    product : Product;
}




const ProductCard : React.FC<ProductCardProps> = ({product}) => {

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-card-image" />
            <div className="product-card-details">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price" >${product.price.toFixed(2)}</p>
                {}
                <Link to={`/product/${product._id}`} className = "product-card-link">
                <button className="product-card-button">View Detail</button>
                </Link>
            </div>
        </div>
    );
};
export default ProductCard;