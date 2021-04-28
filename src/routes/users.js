const express = require('express')
const usersRouter = express.Router()


usersRouter.get('/login' , (req, res) => res.render('Login'));

usersRouter.get('/register' , (req, res) => res.render('register'));

module.exports  = usersRouter
