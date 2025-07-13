import express, {Request,Response} from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import {Product} from "./models/Product";


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

app.get('/',(req,res) =>{

    res.send("working");

});

app.listen(port,()=>{
    console.log("server is running");
});