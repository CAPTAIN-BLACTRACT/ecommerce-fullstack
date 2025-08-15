// src/seed.ts
import { configDotenv } from 'dotenv';
import connectDB from './config/db';
import { Product } from './models/Product'; // Only need to import Product (th
import dotenv from 'dotenv';
dotenv.config(); 

// Derive the type for the data that can be inserted into the Product model.
// Parameters<typeof Product.create>[0] gets the type of the first argument
// expected by the Product.create method, which is a plain object of the product's fields.
type ProductCreateInput = Parameters<typeof Product.create>[0];

// Use this derived type for your sampleProducts array
const sampleProducts: ProductCreateInput[] = [
    {
        name: "Mechanical Keyboard",
        description: "Tactile and clicky mechanical keyboard with RGB backlighting.",
        price: 99.99,
        imageUrl: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Keyboard"
    },
    {
        name: "Gaming Mouse",
        description: "Ergonomic gaming mouse with adjustable DPI and programmable buttons.",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150/33FF57/FFFFFF?text=Mouse"
    },
    {
        name: "Ultra-Wide Monitor",
        description: "34-inch curved ultrawide monitor for immersive gaming and productivity.",
        price: 499.99,
        imageUrl: "https://via.placeholder.com/150/3357FF/FFFFFF?text=Monitor"
    }
];

const seedData = async () => {
    try {
        await connectDB(); // Ensure DB connection before seeding
        console.log('Clearing existing products...');
        await Product.deleteMany({}); // Clears existing data
        console.log('Inserting new sample products...');
        await Product.insertMany(sampleProducts); // insertMany expects plain objects
        console.log('Data seeding complete!');
        process.exit(0);
    } catch (error: any) {
        console.error(`Error seeding data: ${error.message}`);
        process.exit(1);
    }
};

seedData();