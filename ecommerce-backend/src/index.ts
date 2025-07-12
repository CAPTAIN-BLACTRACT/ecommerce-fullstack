import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();
connectDB();
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res) =>{

    res.send("working");

});

app.listen(port,()=>{
    console.log("server is running");
});