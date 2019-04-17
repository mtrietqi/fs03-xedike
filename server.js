/* 3rd packages */
const express = require('express');
const mongoose= require('mongoose');
const passport= require('passport');
/* project packages */
/*Connect DB*/
mongoose.connect('mongodb://localhost:27017/fs03-xedike',{useNewUrlParser:true})
    .then(console.log("Connected to DB"))
    .catch(console.log)
/* initialize server */
const app= express();

/* middlewares */
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize());
require('./config/passport')(passport);
//router
app.use('/api/users',require('./routes/api/users'))

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log('Connected to DB on ' + port)
})