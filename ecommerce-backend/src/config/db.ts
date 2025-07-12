import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        if(!process.env.MONGO_URI)
        {
            throw new Error("mongo uri is not defined");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected : ${conn.connection.host}`);

    }catch(error : any){
        console.error(`error ${error.message}`);
        process.exit(1);
    }
};
export default connectDB;