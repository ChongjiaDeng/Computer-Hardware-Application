// first of all include express
const express = require('express')
const newsRouter = express.Router()
// axios help us error handling, and it makes sure the data is passed in a json file.
const axios = require('axios')

//this time not pass any parameters, it will be asynchronous function
//we have the request and the response
newsRouter.get('', async(req, res) => {
    //res.render('news') //test this page.

    // try to make a method wrap everything into a try and catch.
    try {  
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2021-03-12&sortBy=publishedAt&apiKey=601ca0864b8f4675978510148c431eae`)
        
        //console.log(newsAPI.data)
        res.render('news', { articles : newsAPI.data.articles })
    }
    // a method that catch if it a error
    catch(err){ 
        if(error.response){ // response the data, status and headers if it a error
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)

    } else if (error.requiest){ // response the data if it a error from requiest
        console.log(err.requiest)
    }else{ // others error
        console.error('Error',err.message)
    }

    }
})

// export this module and the news writer
module.exports = newsRouter 