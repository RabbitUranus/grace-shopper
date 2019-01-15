// the order function is expecting a request like this:
// {
//   userId: the user model, or undefined if guest
//   amount: non-zero integer representing the total
//   chargeId: string, something that will come from stripe eventually
//   items: an array of integers, each integer is the ID of the product in the cart, allows multiples
// }

var stripe = require('stripe')('sk_test_EgxBM6gvCK9apeODdVILbLbN');
const router = require('express').Router();
const {Order} = require('../db/models');
module.exports = router;

const isAuthorized = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    res.send(401, 'Unauthorized');
  }
};

// GET api/orders/
router.get('/', isAuthorized, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//POST api/orders
router.post('/', async (req, res, next) => {
  try {
    const order = Order.build({userId: req.body.userId, items: req.body.items});
    order.total = await order.getTotal();

    const charge = await stripe.charges.create({
      amount: order.total,
      currency: 'usd',
      source: 'tok_visa'
    });
    order.chargeId = charge.id;
    const submittedOrder = await order.save();
    res.status(201).json(submittedOrder);
  } catch (err) {
    next(err);
  }
});
