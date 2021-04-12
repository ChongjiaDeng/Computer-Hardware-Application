const { static } = require('express')
const express = require('express')


//This time we set a prot as 8080 on locally this computer or the Web hosting platform
const app = express()
const port = 8080 || process.env.PORT


app.use(express.static(__dirname + '/public'));

app.use('/css' , express.static(__dirname + 'public/css'))
app.use('/img' , express.static(__dirname + 'public/img'))
app.use('/js' , express.static(__dirname + 'public/js'))


//Templating engine
//process templates and data to output text
app.set('views' , './src/views')
app.set('view engine' , 'ejs')


//routes
//The local routes define a route for the one specific IP address configured on the router interface.
const newsRouter = require('./src/routes/news')

app.use('/' , newsRouter) //from page will be basically just slash
app.use('/article', newsRouter)
// to the port 5000
app.listen(port, () => console.log(`Starting server at ${port}`) )

