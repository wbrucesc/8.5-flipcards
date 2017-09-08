const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session');
const routes = require('./routes');
const models = require('./models'); 



const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Passport auth ------------------------------------------------

const checkPassword = function(userpass, password){
  // return user.password === password;
  return bCrypt.compareSync(password, userpass);
};

passport.use('local-login', new LocalStrategy(function(username, password, done){
  models.User.findOne({
    where: {
      username: username
    }
  }).then(function(user){
    if(user === null) {
      done(null, false);        //false means no user
    } else if (user && checkPassword(user.password, password)) {
      done(null, user);
    } else {
      done(null, false);        //there is a user but their password is not correct
    }
  });
}));


passport.use('local-signup', new LocalStrategy({
  passReqToCallback: true
  },
    function(req, username, password, done){
      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
      models.User.findOne({
        where: {
          username: username
        }
      }).then(function(user){
        if(user){
          console.log("If firing");
          return done(null, false, {
            message: 'that username is taken'
          });
        } else {
          console.log("Else firing");
          let userPassword = generateHash(password);
          let data = {
            username: username,
            password: userPassword
          };
          models.User.create(data).then(function(newUser, created){
            console.log("CREATE WORKING");
            if (!newUser){
              return done(null, false);
            }
            if(newUser){
              return done(null, newUser);
            }
          });
        }
      });
    }
));

passport.serializeUser(function(user, done){        //stores user.id onto the session
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  models.User.findById(id).then(function(user){
    done(null, user);
  });
});


//Middleware-------------------------------------------------------

app.use(bodyParser.urlencoded({extended: false}));


app.use(session({
    secret: 'go tigers',   //salt used to generate tokens
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



routes(app);

app.listen(3000);

module.exports = app;
