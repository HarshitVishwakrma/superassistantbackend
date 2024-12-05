const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRoutes = require('./routes/questionsRoute')
require('dotenv').config()

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.use(questionRoutes)



mongoose.connect(process.env.MONGO_URI)
.then((response)=>{
    app.listen(3000, ()=>{
        console.log('server started')
    });
})
.catch(error=>{
    console.log(error)
})
