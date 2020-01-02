 const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
//const flast = require('connect-flash');
const session = require('express-session');
const passport=require('passport');
//passport config
require('./config/passport')(passport);


//Db config
// const db = require('./config/keys').MongoURI;
//Connection
mongoose.connect('mongodb://localhost/db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the Mongo server'))
    .catch((err) => console.log('Something went wrong', err.message));


//Middleware using EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');

//Connecting to passport
app.use(passport.initialize());
app.use(passport.session());

//To get the data from form use bodyparser
app.use(express.urlencoded({ extended: false }));

//Express session

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true

}));
//connection to flash
// app.use(flash());

// //Using of variables
// app.use('/', (req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     next();
// })


//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(port, () => console.log(`Server running on port ${port}...`));