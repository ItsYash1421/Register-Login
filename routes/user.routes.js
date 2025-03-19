const express = require('express')
const router = express.Router()
const { body,validationResult } = require('express-validator'); // custom middleware
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/register',(req,res)=>
    {
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail(),
   body('password').trim().isLength({min:5}),
   body('username').trim().isLength({min:3})
    ,async (req,res) => 
    {
    const erorrs = validationResult(req)
    if(!erorrs.isEmpty())
    {
    return res.status(400).json({
        erorrs:erorrs.array(),
        message: "Invalid data"
    })
    }  
    const {username,email,password} = req.body;
    const hashpass = await bcrypt.hash(password,10)
    const newUser =await  userModel.create({
        email,
        username,
        password:hashpass
    })
    res.json(newUser) // json format to transfer
})

router.get('/login',(req,res) => {
    res.render('login')
})

router.post('/login',
    body('email').trim().isEmail().isLength({min : 13}),
    body('password').trim().isLength({min:8})
    ,async (req,res) =>
         {
            const erorrs = validationResult(req)
            if(!erorrs.isEmpty())
            {
              return res.status(400).json({
                erorrs : erorrs.array(),
                message: "Invalid Data"
              })
            }
            const {email,password} = req.body
            const user = await userModel.findOne({
                email:email
            })
            if(!user)
            {
                return res.status(400).json({
                    message: "User Not Found"
                })
            }
           const isMatch = await bcrypt.compare(password,user.password)
           if(!isMatch) 
           {
            return res.status(400).json({
                message:"Wrong Password"
            })
           }

           // Generating token by jsonwebtoken
           // user login once then token generate and authorize user
       const token = jwt.sign({
        userid:user._id,
        email:user.email,
        username:user.username
       },process.env.JWT_Secret)
       
       // saving token in cookie
       res.cookie('token',token)
       res.send('Logged In')
})
module.exports = router;