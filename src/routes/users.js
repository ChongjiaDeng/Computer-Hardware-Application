const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');


// Login Handler
usersRouter.get('/login' , (req, res) => res.render('login'))
// Register Handler
usersRouter.get('/register' , (req, res) => res.render('register'))

// Regiser Handler
usersRouter.post('/register', (req, res) =>{
     const { username, userPassword, userRePassword} = req.body
     let errors = [];
// check required 
if(!username || !userPassword || !userRePassword) {
    errors.push({ msg: 'please fill out all the fields'})
}
//check username matching
if(username.length < 3 || username.length >= 12 ){
    errors.push({ msg: 'The username should be at least 3 characters, and no more than 12 characters'})
}
// check passwords matching
if(userPassword != userRePassword){
    errors.push({ msg: 'Passwords do not match'})
}

if(userPassword.length < 6 || userPassword.length >= 12 ){
    errors.push({ msg: 'The password should be at least 6 characters, and no more than 12 characters'})
}

if(errors.length > 0){
    res.render('register', 
    {errors, username, userPassword, userRePassword})
}else{
    // Validation passed
    User.findOne({ username: username}).then(user => {
        if(user){
        //user exists
        errors.push({ msg: 'This Username is already registered'})
        res.render('register', { errors, username, userPassword, userRePassword})
    }
    else{ 
        const newUser = new User({ username, userPassword})
 
    //password hashing
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.userPassword, salt, (err, hash) => {
            if(err) throw err
            // let our password to be hash
            newUser.userPassword = hash
            //save user
            newUser.save().then(user =>{
                req.flash('success_msg', 'You have registered the account, please log in')
                res.redirect('/users/login')
            })
            .catch(err => console.log(err))
         })
        })
        }
    })  
    }
})

//custom callback. If the built-in options are not sufficient for handling an authentication request
usersRouter.post('/login', (req, res, next) =>{
    passport.authenticate('local',  {
        successRedirect: '/article',
        failureRedirect: '/users/login',
        failureFlash: true})
        (req, res, next);
});

module.exports  = usersRouter;