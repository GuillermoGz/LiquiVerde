import mongoose from 'mongoose';

const SustainabilitySchema = new mongoose.Schema(
    {
        ambiental: { type: Number, required: true, min: 0, max: 1 },
        social: { type: Number, required: true, min: 0, max: 1 },
        economico: { type: Number, required: true, min: 0, max: 1 }
    },
    { _id: false }
);

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, index: 'text' },
        barcode: { type: String },
        img: { type: String },
        price: { type: Number, required: true, min: 0 },
        weightGrams: { type: Number, default: 0 },
        brand: { type: String },
        category: { type: String },
        nutrition: {
            calories: Number,
            protein: Number,
            fat: Number,
            carbs: Number
        },
        sustainability: { type: SustainabilitySchema, required: true },
        score: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);