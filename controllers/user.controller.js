const bcrypt = require('bcrypt');
const _ = require('lodash');
const axios = require('axios');
const otpGenerator = require('otp-generator');

const { User } = require('../models/user.model');
// const { Otp } = require('../models/otp.model');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = new User({
        username: username,
        password: password
    });

    const result = await user.save();

    return res.status(200).send({
        message: 'User Registration Successfully',
        data: result,
        token: jwt.sign({ name:result.username, number: result.password, _id: result._id }, 'RESTFULAPIs')
    }); 


} 



// module.exports.login = async(req, res) =>{

//     const user = await User.findOne({ username: req.body.username, password: req.body.password });
//     if (user) {

//         return res.status(200).send({
//             message: 'login Successfully',
//             data: user,
//             token: jwt.sign({ name:user.username, number: user.password, _id: user._id }, 'Restfulness')
//         }); 

        
//     } else {
//         return res.status(400).send('User not found!');
        
//     }

 
    
// }


module.exports.hello = async(req, res) =>{

    return res.status(200).send('app API');
}