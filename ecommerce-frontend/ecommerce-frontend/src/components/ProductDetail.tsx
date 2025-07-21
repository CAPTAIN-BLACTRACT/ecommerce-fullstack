import React , {useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { Product } from "../types/Product";
import './ProductDetail.css';
import { isAxiosError } from "axios";


interface ProductDetailProps{

    onAddToCart: (Product:Product) => void;
}


const ProductDetail : React.FC<ProductDetailProps> = ({onAddToCart}) => {

    const {id}  = useParams<{id:string}>();

    const navigate = useNavigate();

    const [product,setProduct] = useState<Product | null>(null);

    const[isLoading,setIsLoading] = useState<boolean>(true);
    const[error , setError]  = useState<string | null>(null);

    useEffect(()=>{
        if(!id){
            setError('Id not found');
            setIsLoading(false);
            return;
        }
        const fetchProduct =  async() => {
            try{
                setIsLoading(true);
                const data = await getProductById(id);
                setProduct(data);
            }
            catch(err:any)
            {
                console.error('error fetching product', err);
                if(isAxiosError(err) && err.response?.status === 404)
                {
                    setError('product not found');

                }else{
                    setError('failed to load product details');
                }
            }
                finally{
                    setIsLoading(false);
                }
            
        };
        fetchProduct();
    }, [id]);

    if(isLoading) return <p>Loading please wait...</p>;
    if(error) return <p className="error-message">{error}</p>;
    if(!product) return <p > Product details not found</p>;

    return(
        <div className="product-detail-container">
            <button onClick={()=> navigate(-1)} className="back-button" >Back to Products</button>
            <div className="product-detail-content">
             <img src={product.imageUrl} alt={product.name} className="product-detail-image" />   
             <div className="product-info">
                <h2>{product.name}</h2>
                <p className="product-detail-price" >${product.price.toFixed(2)}</p>
                <p className="product-detail-description" >{product.description}</p>
                <button className="add-to-cart-button" onClick={()=>onAddToCart(product)}>
                    Add To Cart
                </button>
             </div>
            </div>
        </div>
    );
};

export default ProductDetail;