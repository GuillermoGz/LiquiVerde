import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { computeSustainabilityScore } from '../services/sustainability.service.js';
import { connectDB } from '../db.js';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'products.sample.json');

async function run() {
    try {
        connectDB();

        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);

        await Product.deleteMany();

        const docs = data.map((product) => ({
            ...product,
            score: computeSustainabilityScore(product)
        }));

        await Product.insertMany(docs);

        const count = await Product.countDocuments();
        console.log(`Seed completo. Productos insertados: ${count}`);
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

run();
