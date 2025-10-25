import Product from '../models/product.model.js';
import { computeSustainabilityScore } from '../services/sustainability.service.js'

export const productsHandler = async (req, res, next) => {
    try {
        const { q, barcode } = req.query;

        if (barcode) {
            const product = await Product.findOne({ barcode }).lean();
            if (!product) return res.json({
                count: 0,
                products: []
            });
            return res.json({
                count: product.length,
                products: product
            });
        }

        const filter = q ? {
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { brand: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ]
        } : {};

        const products = await Product.find(filter).lean();
        return res.json({
            count: products.length,
            products
        });

    } catch (err) {
        next(err);
    }
};


export const recalculateSustainabilityScore = async (req, res, next) => {
    try {
        const { q } = req.query;
        const filter = q && {
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { brand: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ]
        };

        const products = await Product.find(filter).lean();

        const recalculateScore = products.map((product) => ({
            updateOne: {
                filter: { _id: product._id },
                update: { $set: { score: computeSustainabilityScore(product) } }
            }
        }));

        await Product.bulkWrite(recalculateScore);

        res.json({ message: 'Scores de Sostenibilidad fueron recalculados' });
    } catch (err) {
        next(err);
    }
};
