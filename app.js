//const {static} = require('express')
const express = require('express')
//const { use } = require('./src/routes/news')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport'); 

//connect-flash
const flash = require('connect-flash');
const session = require('express-session');

//This time we set a prot as 8080 on locally this computer or the Web hosting platform
const app = express()
const port = 8080 || process.env.PORT

//passport config
require('./config/passport')(passport); //passport config


//DB config
 const db = require('./config/keys').mongoURI;

//connect to Mongoosedb
 mongoose
   .connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true})
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err));

app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));


app.use('/css' , express.static(__dirname + 'public/css'))
app.use('/img' , express.static(__dirname + 'public/img'))
app.use('/js' , express.static(__dirname + 'public/js'))


//Templating engine
//process templates and data to output text
app.set('views' , './src/views')
//app.use(expressLayouts);
app.set('view engine' , 'ejs')

//Bodayparser
app.use(express.urlencoded({ extended: true}));

// express-session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// npm passport connect middleware
app.use(passport.initialize());
app.use(passport.session());
//connect flash
app.use(flash());

//global variables
 app.use(function(req, res, next) {
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
next();
});

//routes
const newsRouter = require('./src/routes/news') //The local routes define a route for the one specific IP address configured on the router interface.
const usersRouter = require('./src/routes/users')
const searchRouter = require('./src/routes/search')


app.use('/' , newsRouter) //from page will be basically just slash
app.use('/article', newsRouter)
app.use('/users', usersRouter)
app.use('/search', searchRouter)
// to the port 8080
app.listen(port, () => console.log(`Starting server at ${port}`) )

