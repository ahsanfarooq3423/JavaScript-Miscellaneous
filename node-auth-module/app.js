const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const flash = require('flash-connect');
const session = require('express-session');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');

const MONGODB_URI = require('./config/keys').MONGODB_URI;

const app = express();

app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyparser.urlencoded( {extended  : true} ))

//Express Session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))

app.use(indexRoutes);
app.use(userRoutes);


mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(response => {
        console.log('CONNNECTED HUHU AUTH');
        app.listen(3000);
    })
    .catch(err => console.log(err));
