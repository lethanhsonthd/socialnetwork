const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('../models/User').model('User')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const debug = require('debug')('http')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({ secret: 'son', saveUninitialized: true, resave: true, cookie: { maxAge: 60000 } }))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({
        username: username
    }, (err, user) => {
        if (err) return done(err)
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username'
            })
        }
        if (user.password != password) {
            return done(null, false, {
                message: 'Incorrect password'
            })
        }
        return done(null, user)
    })
}))
app.get('/login', (req, res) => {
    res.render('index')
})
function requireLogin(req,res,next){
    if (req.isUnauthenticated()) return res.redirect('/login')   
    next()
}
app.post('/login', (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if (err) {
            return next(err)
        }
        if (!user){
            return res.redirect('/login')
        }
        req.logIn(user,(err)=>{
            if (err){
                return next(err)
            }
            return res.redirect('home')
        })
    })(req,res,next)
})
app.post('/logout',(req,res)=>{
    req.logout()
    res.redirect('/login')
})
app.get('/home',requireLogin,(req,res,next)=>{
    res.render('testchat')
})
app.get('/',(req,res)=>{
    
    res.redirect('login')
})
module.exports = app