// the order function is expecting a request like this:
// {
//   userId: the user model, or undefined if guest
//   amount: non-zero integer representing the total
//   chargeId: string, something that will come from stripe eventually
//   items: an array of integers, each integer is the ID of the product in the cart, allows multiples
// }

const router = require('express').Router();
const {Item, User, Order} = require('../db/models');
module.exports = router;

// GET api/orders/
router.get('/', async (req, res, next) => {
  try {
    const products = await Order.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//POST api/orders
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    next(err);
  }
});
