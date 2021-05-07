const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

// The form to loading out user model
const User = require('../src/models/User');

/* router.post('/login', function (req, res) {
  const {username, password} = req.body
  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  UserModel.findOne({username, password:md5(password)}, filter, function (err, user) {
    if(user) { // 登陆成功
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
      // 返回登陆成功信息(包含user)
      res.send({code: 0, data: user})
    } else {// 登陆失败
      res.send({code: 1, msg: '用户名或密码不正确!'})
    }
  })
})
*/

module.exports = function (passport){
    passport.use(
        new LocalStrategy({ usernameField: 'username', passwordField: 'userPassword'}, (username, userPassword, done)=>{
            //match the name of the user
            User.findOne({username: username}).then(user =>{
                 
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
            
        })
    );
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) =>{
          done(err, user);
        });
      });
    }