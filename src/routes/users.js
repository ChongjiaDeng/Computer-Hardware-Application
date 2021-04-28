const express = require('express')

const usersRouter = express.Router()


// Login Handler
usersRouter.get('/login' , (req, res) => res.render('Login'))
// Register Handler
usersRouter.get('/register' , (req, res) => res.render('register'))

// Regiser Handler
usersRouter.post('/register', (req, res) =>{
     const { username, userPassword, userRePassword} = req.body
     let errors = []

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
    res.send('pass')
}
})

module.exports  = usersRouter
