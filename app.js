// For Useer authentication we use JWT : json web token 
// using tailwind with flowbite 
// express validator npm use for chcking valing email,password or name
// use bcrypt for hide password
// using cookies for autherization by token. using cookie-parser
// for uploading form we have enctype="multipart/form-data" with methode post
// use firebase to store files 
const userroutes =  require('./routes/user.routes')
const homeroutes = require('./routes/index.routes')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config() // for env 
const cookie = require('cookie-parser') 

const app = express()
const connectToDB = require('./config/db')
connectToDB()

app.set('view engine','ejs')
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',homeroutes)
app.use('/user',userroutes)


app.listen(3000,()=>{
    console.log("Server start at port 3000")
})