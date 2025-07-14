import express, {Request,Response} from "express";
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

app.get('/',(req,res) =>{

    res.send("working");

});

app.listen(port,()=>{
    console.log("server is running");
});