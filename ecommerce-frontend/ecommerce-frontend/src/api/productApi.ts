import axios from 'axios';
import { Product } from '../types/Product';

const API = axios.create({
    baseURL : 'http://localhost:3000/api',
});

export const getAllProducts = async() : Promise<Product[]> => {
    const response = await API.get<Product[]>('/products');
    return response.data;
}

export const getProductById = async(id:string) : Promise<Product> => {
    const response = await API.get<Product>(`/products/${id}`);
    return response.data;
}