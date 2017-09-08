'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    question: {type: DataTypes.STRING, allowNull: false},
    answer: {type: DataTypes.STRING, allowNull: false},
    guess: {type: DataTypes.BOOLEAN, allowNull: false}
  });
  return Card;
};
