const Sequelize = require('sequelize');
const db = require('../db');
const Item = require('./item');
const User = require('./user');

const Order = db.define('order', {
  chargeId: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  }
});

Order.hasOne(User);

module.exports = Order;
