import mongoose, {Document,Schema, Model} from "mongoose";

export interface IProduct extends Document{
    name:string;
    description:string;
    price:number;
    imageUrl:string;
    createdAt?: Date; // Optional, Mongoose adds these with timestamps
    updatedAt?: Date;
}

const ProductSchema: Schema = new Schema({
    name: {type: String, required: true, trim: true },
    description: {type:  String , required: true},
    price: {type: Number , required: true, min:0},
    imageUrl: {type: String, required: true},
},{timestamps:true
});

const Product : Model<IProduct> = mongoose.model<IProduct>('Product',ProductSchema);
export  {Product};