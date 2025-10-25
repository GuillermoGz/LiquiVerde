import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";
const uri = process.env.MONGO_URI || MONGO_URI;
mongoose.connect(uri);

export const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('[-- DB conectado --]')
    } catch (error) {
        console.log(error);
    }

}