import Product from '../models/product.model.js';
import { optimizeCart } from '../services/optimization.service.js';

export const optimize = async (req, res, next) => {
    try {
        const { budget, productIds = [] } = req.body;

        if (!budget || budget <= 0) {
            return res.status(400).json({ message: 'budget es requerido y debe ser > 0' });
        }

        let products = [];
        let type = 0;

        if (productIds.length > 0) {
            products = await Product.find({ _id: { $in: productIds } }).lean();
            type = 1;
        } else {
            products = await Product.find().lean();
            type = 2;
        }

        const result = optimizeCart(products, budget, type);

        res.json(result);
    } catch (err) {
        next(err);
    }
};