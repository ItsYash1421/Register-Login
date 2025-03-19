const mongose =require('mongoose')

function connectToDB()
{
    mongose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected To DB")
    })
}

module.exports = connectToDB