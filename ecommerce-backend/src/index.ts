import express, {application, Request,Response} from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import {Product} from "./models/Product";
import mongoose from "mongoose";


dotenv.config();
connectDB();
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/api/products', async(req,res)=>{
  try { 
    const products = await Product.find({});
    res.status(200).json(products);
    }
    catch(error:any){
        console.error('error fetching products from database',error);
        res.status(500).json({message:'error fetching products from database',error: error.message});
    }
    
});


app.get('/api/products/:id', async(req,res )=>{

    try{
        const productId =  req.params.id;

        const product =  await Product.findById(productId);

        if(!product)
        {
            res.status(404).json({message:'Product not found'});
        }
        res.status(200).json(product);
    }
    catch(error){
        console.error(`Error fetching product by id : ${req.params.id}`, error);

        if(error instanceof mongoose.Error.CastError){
            return res.status(400).json({message:'invalid id error'});
        }
        res.status(500).json({message:'internal server error while finding product by id'});
    }
});
app.post('/api/products', async(req , res)=>{

    try{
        const {name , description , price , imageUrl} = req.body;

        if(!name || !description || !price || !imageUrl)
        {
            return res.status(400).json({message:'all fiels are mandatory'});
        }

        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl,
        });

        const savedProduct = await newProduct.save();
    }
    catch(error: any){
        console.error("error saving new product ",error);

        if(error.name==='ValidationError')
        {
            return res.status(400).json({message:error.message, errors: error.errors});
        }
        res.status(500).json({message:'failed to create product',error: error.message});
    }
});

app.get('/',(req,res) =>{

    res.send("working");

});

app.listen(port,()=>{
    console.log("server is running");
});