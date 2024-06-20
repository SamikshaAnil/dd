require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { checkSchema } = require('express-validator')
const port = 3009

const configureDB = require('./config/db')
configureDB()
const employeeCltr = require('./App/controllers/employee')
const usersCltr= require('./App/controllers/users')

const employeeValidationSchema = require('./App/validators/employee-validation')
app.use(express.json())
app.use(cors())
const multer = require('multer')


app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload=multer({storage})


app.post('/api/users/register',usersCltr.register)

app.post ('/api/users/login',usersCltr.login)

app.post('/api/employees', upload.single('images'), checkSchema(employeeValidationSchema), employeeCltr.create)
app.put('/api/employees/:id', upload.single('images'), checkSchema(employeeValidationSchema), employeeCltr.update)
app.get('/api/employees', employeeCltr.list)
app.delete('/api/employees/:id', employeeCltr.delete)

app.listen(port, () => {
    console.log(`Employee-management App is successfully running on the ${port}`)
})
