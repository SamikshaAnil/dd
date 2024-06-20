const { body } = require('express-validator')
const Employee = require('../models/employee-model')

const employeeValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: '* name should not be empty'
        }
    },
    email : {
        notEmpty : {
            errorMessage : 'email should not be empty'
        },
        isEmail : {
            errorMessage : 'email must be in email format'
        },
        // custom : {
        //     options : async function(value){
        //         const employee = await Employee.findOne({email:value})
        //         if(!employee){
        //             return true
        //         }else {
        //             throw new Error ('Email already exists!')
        //         }
        //     }
        // },
        normalizeEmail : true,trim : true
    },
    mobile : {
        notEmpty : {
            errorMessage : 'mobile should not be empty'
        },
        isNumeric : {
            errorMessage : 'mobile should be a number type'
        },
        isLength : {
            options : {min:10,max:10},
            errorMessage : 'mobile number should have 10 digits'
        },
        // custom : {
        //     options : async function (value) {
        //         const employee = await Employee.findOne({mobile:value})
        //         if(!employee){
        //             return true
        //         }else{
        //             throw new Error('number already exists')
        //         }
        //     }
        // } , 
        trim : true
    },
    // desgination: {
    //     notEmpty: {
    //         errorMessage: '* desgination should not be empty'
    //     }
    // },
    gender: {
        notEmpty: {
            errorMessage: '* gender should not be empty'
        }
    },
    course: {
        notEmpty: {
            errorMessage: '* course should not be empty'
        }
    },
    images: {
        custom: {
            options: (value, { req }) => {
                if (!req.file) {
                    throw new Error('* images should not be empty')
                }
                return true
            }
        }
    }
}

module.exports = employeeValidationSchema
