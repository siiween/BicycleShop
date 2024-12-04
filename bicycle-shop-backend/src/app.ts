import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from '@middlewares/error-handler.middleware';
import productCategoryRoutes from '@routes/product-category.router';
import productRoutes from '@routes/product.router';
import partRoutes from '@routes/part.router';
import optionRouter from '@routes/option.router';

const app = express();
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Importing routes
app.use('/categories', productCategoryRoutes);
app.use('/products', productRoutes);
app.use('/parts', partRoutes);
app.use('/options', optionRouter);

// Error handling middleware 
app.use(errorHandler);

export default app;
