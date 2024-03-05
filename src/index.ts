import express from 'express';
import {Request, Response} from 'express';
import bodyParser from 'body-parser';
require('dotenv').config()

import { Sequelize } from 'sequelize';
import  User  from './models/userModel';
import Product from './models/productModel';

import router from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import addressRouter from './routes/addressRoutes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',router);
app.use('/products', productRouter);
app.use('/add', addressRouter);

const port = 5050;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})