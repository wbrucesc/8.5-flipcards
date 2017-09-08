const models = require('../models');

const ApiController = {
  list: function(req, res){
    models.Deck.findAll().then(function(decks){
      res.json(decks);
    });
  },

  add: function(req, res){
    models.Deck.create({
      question: req.body.question,
      answer: req.body.answer
    }).then(function(deck){
      res.json(deck);
    });
  },










};

module.exports = ApiController;
