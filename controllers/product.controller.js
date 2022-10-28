

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

    return res.status(201).send({
        message: 'Product Registration Successfully',
        data: result,
    }); 


} 


module.exports.getAllProduct = async (req, res) => {

    const result = await  Product.find();
    return res.status(200).send(result); 
} 


module.exports.updateProduct = async (req, res) => {

    const name = req.body.name;
    const description = req.body.description;

    let doc = await Product.updateOne({_id: req.params.id}, product)
    return res.status(200).send(doc.data)
} 



module.exports.deleteProduct = async (req, res) => {


    let doc = await Product.remove({_id: req.params.id})
    return res.status(200).send(doc);

} 







