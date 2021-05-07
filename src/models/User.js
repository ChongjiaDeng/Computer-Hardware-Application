const mongoose = require('mongoose');
// create find data schema 
const UserSchema = new mongoose.Schema({
    username:{ type: String,
                required: true},
    userPassword:{ type: String,
                  required: true}

});
// register schema
const User = mongoose.model('User', UserSchema);

module.exports = User;