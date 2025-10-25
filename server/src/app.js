import express from "express";
import morgan from "morgan";
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import optimizeRoutes from './routes/optimize.routes.js';
import substitutionRoutes from './routes/substitution.routes.js';
import { notFound, errorHandler } from './utils/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
    res.json({
        name: 'LiquiVerde API',
        version: '1.0.0',
        status: 'ok'
    });
});

app.use('/api/products', productRoutes);
app.use('/api/optimize', optimizeRoutes);
app.use('/api/substitution', substitutionRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;