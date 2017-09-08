'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    name: {type: DataTypes.STRING, allowNull: false}
  });
  return Deck;
};
