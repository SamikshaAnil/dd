const mongoose = require('mongoose')

const {Schema,model} = mongoose

const employeeSchema = new Schema({

    // adminId : {
    //     type : Schema.Types.ObjectId,
    //     ref : 'User'
    // },
  
    name:String,
	
	email:String,
	
	mobile:String,
	
	designation:String,
	
	gender:String,
	
    course: {
        type: [String], 
        required: true
    },	
    images : 
    {
        type:[String],
        required: true

    }

},{timestamps:true})

const Employee = model('Employee',employeeSchema)

module.exports = Employee