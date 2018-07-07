const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const fs = require('fs')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const router = require('./Router/router')
mongoose.connect('mongodb://localhost:27017/socialnetwork',()=>{
    console.log('Connect successfully')
})
app.use(router)
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views','./views')
app.set('view engine','ejs')
app.listen(3000,()=>{
    console.log('Running at port 3000')
})