const {Schema, model} = require('mongoose');
// const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    password: { type: String, required: true },
    username: { type: String, required: true },
},{timestamps: true });

module.exports.User = model('User', userSchema);