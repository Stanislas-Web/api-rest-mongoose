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





module.exports.verifyOtp = async(req, res) =>{
    const user = await User.findOne({ number: req.body.number });
    console.log(user);

    if (user){
        // OTP Login
        const otpHolder = await Otp.find({ 
            number: req.body.number 
        }); 
        if(otpHolder.length === 0) return res.status(400).send('You use an Expired OTP');
        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
        
        if(rightOtpFind.number === req.body.number && validUser) {
            const result = await User.findOne({ number: req.body.number });
            return res.status(200).send({
                message: 'User login Successfully',
                data: result,
                token: jwt.sign({ name:result.name, number: result.number, _id: result._id }, 'RESTFULAPIs')
            }); 

        }else{
            return res.status(400).send('Your OTP is Wrong');
        }


    }else{

        // OTP SIGNUP
        const otpHolder = await Otp.find({ 
            number: req.body.number 
        }); 
        if(otpHolder.length === 0) return res.status(400).send('You use an Expired OTP');
        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
        
        if(rightOtpFind.number === req.body.number && validUser) {
            const user = new User({
                number: req.body.number,
                name: rightOtpFind.name
            });
            const result = await user.save();
            const OTPDelete = await Otp.deleteMany({ number: rightOtpFind.number });
            return res.status(200).send({
                message: 'User Registration Successfully',
                data: result,
                token: jwt.sign({ name:result.name, number: result.number, _id: result._id }, 'RESTFULAPIs')
            }); 
        }else{
            return res.status(400).send('Your OTP is Wrong');
        }

    }
    
}

module.exports.login = async(req, res) =>{

    const user = await User.findOne({ number: req.body.number });
    if (user) {

        // generate otp
        const OTP = otpGenerator.generate(4, { digits: true, alphabets: false,lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });

        const number = req.body.number;
    
        console.log(OTP);
    
        const otp = new Otp({
            number: number,
            otp: OTP,
            name: user.name
        });
    
        
    
        // const messagebird = require('messagebird')('SyyKRakJnhvZuKaWxqLpicppQ');

        // const params = {
        //   'originator': 'Mushashino',
        //   'recipients': [
        //     '+243970063348'
        // ],
        //   'body': 'Code de vérification : '+OTP
        // };
    
        // messagebird.messages.create(params, function (err, response) {
        //   if (err) {
        //     return console.log(err);
        //   }
        //   console.log(response);
        // });
    
        const salt = await bcrypt.genSalt(10);
        otp.otp = await bcrypt.hash(otp.otp, salt);
        const result = await otp.save();
        return res.status(200).send({
            message: 'OTP Sent Successfully',
            otp: OTP,
        });

        
    } else {
        return res.status(400).send('User not found!');
        
    }

 
    
}


module.exports.hello = async(req, res) =>{

    return res.status(200).send('Lamba app API');
}