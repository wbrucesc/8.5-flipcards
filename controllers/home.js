const models = require('../models');


const HomeController = {
  index: function(req, res){
    models.Deck.findAll().then(function(decks){
          res.render('home', {Deck: decks});
    });
  },

  form: function(req, res){
    res.render('form');
  },

  newDeck: function(req, res){
    models.Deck.create({
      name: req.body.name
    }).then(function(deck){
      res.redirect('/');
    });
  },









  out: function(req, res){
    // res.redirect('login');
  req.session.destroy(function(){
    res.redirect('/login');
    // console.log('USER LOGGED OUT');
    });
  },



};

module.exports = HomeController;
