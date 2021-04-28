const express = mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{ type: String, required: True},
    password:{ type: String, required: True}

});

const User = mongoose.module('User' , UserSchema);

moudle.exports = User; 