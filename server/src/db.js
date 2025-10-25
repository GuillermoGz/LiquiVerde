import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

mongoose.connect(MONGO_URI);

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('[-- DB conectado --]')
    } catch (error) {
        console.log(error);
    }

}