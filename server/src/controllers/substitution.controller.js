import Product from '../models/product.model.js';
import { recommendProduct } from '../services/substitution.service.js';

export const substitution = async (req, res, next) => {
    try {
        const { id } = req.query;

        const product = await Product.findById(id).lean();
        if (product) {
            const { category, price, sustainability, weightGrams } = product
            const productsByCategory = await Product.find({
                category,
                _id: { $ne: id }
            }).lean();
            if (!productsByCategory) return res.status(404).json({ message: 'Producto similares no encontrados' });
            const result = recommendProduct(price, sustainability, weightGrams, productsByCategory);
            res.json(result);
        }
    } catch (err) {
        next(err);
    }
}