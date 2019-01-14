const Sequelize = require('sequelize');
const db = require('../db');
const Item = require('./item');
const User = require('./user');

const Order = db.define('order', {
  chargeId: {
    type: Sequelize.STRING,
    default: 'Not Charged'
  },

  isCart: {
    type: Sequelize.BOOLEAN,
    default: true
  },

  total: {
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

User.hasMany(Order);
// Order.hasOne(User);
Order.belongsTo(User);

module.exports = Order;
