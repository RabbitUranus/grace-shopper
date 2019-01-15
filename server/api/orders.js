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

// TODO #ISSUENUMBER - To add auth middleware.
// const isAuthorized = (req, res, next) => {
//   if (req.user && req.user.isAdmin === true) {
//     next(req, res, next);
//   } else {
//     res.send(401, 'Unauthorized');
//   }
// };

// app.use(isAuthorized); 

// GET api/orders/
router.get('/', async (req, res, next) => {
  //CG: This will throw a 500 for a non-logged in user.
  if (req.user.isAdmin) {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  } else {
    console.log('in the else');
    next();
  }
});

//POST api/orders
router.post('/', async (req, res, next) => {
  try {
    let order = req.body; //CG: This line of code telsl me that you are taking the users word for it.

      //CG: Validate the information along side of the pricing.
    const charge = await stripe.charges.create({
      amount: order.amount,
      currency: 'usd',
      source: 'tok_visa'
    });
    order.chargeId = charge.id;

    const response = await Order.create(order);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});
