const mongoose = require('mongoose')
const configureDB = (async()=>{
    try{
        const response = await mongoose.connect('mongodb://127.0.0.1:27017/employee')
        console.log('Connected to db')
    }
    catch(err){
        console.log('Error connecting to db',err)
    }
})

module.exports = configureDB