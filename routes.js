const express = require('express');
const passport = require('passport');

const HomeController = require('./controllers/home');
const UserController = require('./controllers/user');
const ApiController = require('./controllers/api');

module.exports = function(app) {
 const homeRouter = express.Router();
 const userRouter = express.Router();
 const apiRouter = express.Router();

 const requireLogin = function(req, res, next) {
   if (req.user) {
     next();
   } else {
     res.redirect('login');
   }
 };



//Home
homeRouter.use(requireLogin);
homeRouter.get('/', HomeController.index);            //shows list of user's decks
homeRouter.get('/logout', HomeController.out);        //logs user out
homeRouter.get('/newDeck', HomeController.form);      //add new deck
homeRouter.post('/newDeck', HomeController.newDeck);  //creates new deck

//Api
apiRouter.get('/decks', ApiController.list);      //lists decks
apiRouter.post('/decks', ApiController.add);      //create new deck 

//User
userRouter.get('/login', UserController.login);   //user prepended to / on all user routes
userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    // failureFlash: true
  }));

userRouter.get('/signup', UserController.signup);
userRouter.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup'
  // failureFlash: true
}));



app.use('/api', apiRouter);
app.use('/', userRouter);
app.use('/', homeRouter);
};
