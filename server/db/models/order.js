const Sequelize = require('sequelize');
const db = require('../db');
const Item = require('./item');
const User = require('./user');

const Order = db.define('order', {
  chargeId: {
    type: Sequelize.STRING,
    defaultValue: 'Not Charged'
  },

  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
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

Order.prototype.getTotal = async function() {
  const arrayOfItems = await Promise.all(
    this.items.map(async element => {
      return Item.findById(element);
    })
  );
  const total = arrayOfItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
  return total;
};

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
