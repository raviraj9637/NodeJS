
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
//bring all routes
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const questions = require('./routes/api/questions');



const app = express();

//middleware fore body-parser
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

//mongoDB configuration
const db = require('./setup/myurl').mongoURL

//attemp to connect to database

mongoose
    .connect(db)
    .then(() => console.log("mongoDB connected successfully"))
    .catch( err => console.log(err)
    )


var port = process.env.PORT || 3000;
var hostname = "127.0.0.1";

//just for testing route
app.get('/', (req, res) => {
    res.send("hello this is small stack ");
});

//passport middileware
app.use(passport.initialize());

//config for jWT strategy
require('./strategies/jsonwtStrategy')(passport);


//auctual routes
app.use('/api/auth', auth);

app.use('/api/profile', profile);

app.use('/api/questions', questions);


app.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`);
});