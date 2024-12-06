import express from 'express';
import { errorHandler } from '@middlewares/error-handler.middleware';
import productCategoryRoutes from '@routes/product-category.router';
import productRoutes from '@routes/product.router';
import partRoutes from '@routes/part.router';
import optionRouter from '@routes/option.router';
const cors = require("cors");

const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importing routes
app.use('/categories', productCategoryRoutes);
app.use('/products', productRoutes);
app.use('/parts', partRoutes);
app.use('/options', optionRouter);

// Error handling middleware 
app.use(errorHandler);

export default app;
