const Employee = require('../models/employee-model')
const { validationResult } = require('express-validator')

const employeeCltr = {}

employeeCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { body, files } = req;
        const employeeData = {
            ...body,
            images: files ? files.map(file => file.path) : []
        };

        // Check for existing email
        const existingEmployeeByEmail = await Employee.findOne({ email: body.email });
        if (existingEmployeeByEmail) {
            return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
        }

        // Check for existing mobile
        const existingEmployeeByMobile = await Employee.findOne({ mobile: body.mobile });
        if (existingEmployeeByMobile) {
            return res.status(400).json({ errors: [{ msg: 'Mobile number already exists' }] });
        }

        const employee = new Employee(employeeData);
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
};

employeeCltr.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const id = req.params.id
        const { body, file } = req
        const updateData = {
            ...body,
            images: file ? file.path : body.images // if file is uploaded, use its path, otherwise keep the existing value
        }
        const employee = await Employee.findOneAndUpdate({ _id: id }, updateData, { new: true })
        res.status(200).json(employee)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal Server Error' })
    }
}

employeeCltr.list = async (req, res) => {
    try {
        const employee = await Employee.find()
        res.status(200).json(employee)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal Server Error' })
    }
}

employeeCltr.delete = async (req, res) => {
    try {
        const id = req.params.id
        const employee = await Employee.findOneAndDelete({ _id: id })
        res.status(200).json(employee)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal Server Error' })
    }
}

module.exports = employeeCltr
