const Sequelize = require('sequelize');
const db = require('../db');
const Item = require('./item');
const User = require('./user');

const Order = db.define('order', {
  chargeId: {
    type: Sequelize.STRING,
    default: 'No Stripe ID'
  },
  amount: { //CG: amount is vague.
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  //CG: This is a cue to me that I want a many-to-many through table.
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  }
});

User.hasMany(Order);
// Order.hasOne(User);
Order.belongsTo(User);

module.exports = Order;
