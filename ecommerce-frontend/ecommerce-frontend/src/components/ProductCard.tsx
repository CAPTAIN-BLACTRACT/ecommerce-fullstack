import React from "react";
import { Product } from "../types/Product";
import './ProductCard.css';

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
                <button>View Detail</button>
            </div>
        </div>
    );
};
export default ProductCard;