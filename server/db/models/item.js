const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM('watch', 'ring', 'earrings', 'necklace'),
    allowNull: false
  },
  description: Sequelize.TEXT,
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0.0
    }
  },
  color: {
    type: Sequelize.ENUM(
      'gold',
      'silver',
      'black',
      'brown',
      'red',
      'orange',
      'blue',
      'green'
    )
  }
});

module.exports = Item;
