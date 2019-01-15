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

//GET specific order (for cart)
router.get('/:userId', async (req, res, next) => {
  if (req.params.userId != 'undefined') {
    try {
      const cart = await Order.findOne({
        where: {userId: req.params.userId, isCart: true}
      });
      res.json(cart);
    } catch (err) {
      next(err);
    }
  }
  res.json([]);
});
// GET api/orders/
router.get('/', isAuthorized, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  //expects a userId
  try {
    let cart = {};
    if (req.body.userId) {
      cart = await Order.findOne({
        where: {userId: req.body.userId, isCart: true}
      });
    } else {
      cart = Order.build({
        userId: req.body.userId,
        items: req.body.items,
        isCart: false
      });
    }

    cart.total = await cart.getTotal();

    try {
      const charge = await stripe.charges.create({
        amount: cart.total,
        currency: 'usd',
        source: 'tok_visa'
      });
      cart.chargeId = charge.id;
      cart.isCart = false;
      //this will turn it into a fulfilled order

      await cart.save();
      res.status(202).json(cart);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send(
          'Sorry, something has gone wrong with processing your credit card'
        );
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send('Sorry, something has gone wrong with processing your order');
    next(err);
  }
});
