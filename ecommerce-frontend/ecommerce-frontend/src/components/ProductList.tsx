import React , {useEffect,useState} from "react";

import { getAllProducts } from "../api/productApi";
import { Product } from "../types/Product";
import ProductCard from "./ProductCard";
import './ProductList.css';

const ProductList : React.FC = () => {
    const [products,setProducts] = useState<Product[]>([]);
    const [isLoading,setIsLoading]= useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchProducts = async() => {
            try{
                setIsLoading(true);
                const data = await getAllProducts();
                setProducts(data);
                } catch(err:any){
                    console.error("error fetching products",err);
                    setError('failed to fetch products. Please try again later');
                }
                finally{
                    setIsLoading(false);
                }
        };
        fetchProducts();
    },[]);

    if(isLoading) return <p>Loading Products...</p>;
    if(error) return <p className="error-message">{error}</p>;
    if(products.length === 0) return <p>No products found</p>;

    return(
        <div className="product-list-container">
            {products.map((product)=>(<ProductCard key={product._id} product={product} />))}
        </div>
    );
};

export default ProductList;