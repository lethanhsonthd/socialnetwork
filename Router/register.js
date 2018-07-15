const app = require('express')()
const User = require('../models/User').model('User')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/register',(req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    User.create({
        username: username,
        password: password,
        email: email
    }).exec
    res.redirect('login')
})
module.exports = app