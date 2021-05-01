const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

// The form to loading out user model
const User = require('../src/models/User');

module.exports = function (passport){
    passport.use(
        new LocalStrategy({ usernameField: 'user'}, (username, userPassword, done)=>{
            //match the name of the user
            User.finOne({username: username}).then(user =>{
                if(!user){
                    return done(null, false, {message:'You have not registed this username'});
                }
                //mathe the password of the user
                bcrypt.compare(userPassword, user.userPassword, (err, isMatch) =>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }else{ return done(null, false, {message: 'you enter the incorrect password'})}
                });
            })
            .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) =>{
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) =>{
          done(err, user);
        });
      });
    }