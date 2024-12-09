import express from 'express';
import { errorHandler } from '@middlewares/error-handler.middleware';
import productCategoryRoutes from '@routes/product-category.router';
import productRoutes from '@routes/product.router';
import partRoutes from '@routes/part.router';
import optionRouter from '@routes/option.router';
import forbiddenCombinationRouter from '@routes/forbidden-combination.router';
import dependentPriceRouter from '@routes/dependent-price.router';
import path from 'path';
const cors = require("cors");

const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Importing routes
app.use('/categories', productCategoryRoutes);
app.use('/products', productRoutes);
app.use('/parts', partRoutes);
app.use('/options', optionRouter);
app.use('/forbidden-combinations', forbiddenCombinationRouter);
app.use('/dependent-prices', dependentPriceRouter);

// Error handling middleware 
app.use(errorHandler);

export default app;
