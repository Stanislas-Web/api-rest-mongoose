const express = require('express');
const app = express();
const cors = require('cors');
const UserRouter = require('./routers/user.router');
const ProductRouter = require('./routers/product.router');

app.use(cors());
app.use(express.json());

app.use('/api/v1/', UserRouter, ProductRouter);

module.exports = app;