// load environment properties from a .env file for local development
var dotenv = require('dotenv')
dotenv.load()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// setup body-parser
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var nluRouter = require('./routes/nlu');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/nlu', nluRouter);

module.exports = app;
