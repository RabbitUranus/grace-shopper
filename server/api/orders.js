// the order function is expecting a request like this:
// {
//   userId: the user model, or undefined if guest
//   amount: non-zero integer representing the total
//   chargeId: string, something that will come from stripe eventually
//   items: an array of integers, each integer is the ID of the product in the cart, allows multiples
// }

var stripe = require('stripe')('sk_test_EgxBM6gvCK9apeODdVILbLbN');
const router = require('express').Router();
const {Item, User, Order} = require('../db/models');
module.exports = router;

// GET api/orders/
router.get('/', async (req, res, next) => {
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
    let order = req.body;

    const charge = await stripe.charges.create({
      amount: 999,
      currency: 'usd',
      source: 'tok_visa'
    });
    order.chargeId = charge.id;

    const response = await Order.create(order);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

router.post('/stripe', async (req, res, next) => {
  try {
    const charge = await stripe.charges.create({
      amount: 999,
      currency: 'usd',
      source: 'tok_visa'
      //receipt_email: 'jenny.rosen@example.com',
    });
    res.json(charge);
  } catch (err) {
    next(err);
  }
});
