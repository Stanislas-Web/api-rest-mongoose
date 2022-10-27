

const { Product } = require('../models/product.model');
// const { Otp } = require('../models/otp.model');
const jwt = require('jsonwebtoken');

module.exports.createProduct = async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    const product = new Product({
        name: name,
        description: description
    });

    const result = await product.save();

    return res.status(200).send({
        message: 'Product Registration Successfully',
        data: result,
    }); 


} 


