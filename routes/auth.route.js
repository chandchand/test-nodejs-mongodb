// const { Router } = require('express')
const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');


router.post('/register', async (req,res,) => {
    const newUser = new User({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, 'aptx4869').toString(),
        name: req.body.name
    });
    try {
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        !user && res.status(401).json("Wrong Credentials!!");
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 'aptx4869'
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        OriginalPassword !== req.body.password && res.status(401).json("Wrong Credentials!!");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        'aptx',
        {expiresIn:"3d"}
        );

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
    } catch (error) {
        
        res.status(500).json(error.message);
    }
})



module.exports = router;