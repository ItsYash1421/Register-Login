const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
       type:String,
       required:true,
       trim:true,
       lowercase:true,
       unique:true,
       minlength:[3,'Username atleast of 3 character']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,'Email should have 13 character long']
     },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[8,'Password atleast of 8 character']
     }
})


const user = mongoose.model('user',userSchema)
module.exports = user