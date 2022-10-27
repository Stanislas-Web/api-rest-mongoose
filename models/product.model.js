const {Schema, model} = require('mongoose');
// const jwt = require('jsonwebtoken');

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
},{timestamps: true });

module.exports.Product = model('Product', productSchema);