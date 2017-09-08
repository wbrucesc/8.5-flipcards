const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session');
const routes = require('./routes'); 



const app = express();

routes(app);

app.listen(3000);

module.exports = app;
