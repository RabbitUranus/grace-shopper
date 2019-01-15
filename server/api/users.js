const router = require('express').Router();
const {User, Order} = require('../db/models');
module.exports = router;

// POST add item to cart
router.post('/:userId/orders', async (req, res, next) => {
  //only run this if the user is logged in (if userid is not undefined)
  if (req.params.userId != 'undefined') {
    //   //TODO: discuss: does this need to be validated somehow? the worst that could happen is someone adds an item to another person's cart, or they add an item that does not exist. Neither one is particularly dangerous
    try {
      const [order, wasCreated] = await Order.findOrCreate({
        where: {userId: req.params.userId, isCart: true},
        defaults: {
          chargeId: 'Not Charged',
          isCart: true,
          total: 0,
          items: [req.body.itemId]
        }
      });
      //if the order already existed the item needs to be added to cart
      if (!wasCreated) {
        try {
          await Order.update(
            {
              items: [...order.items, req.body.itemId]
            },
            {
              where: {id: order.id}
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
  res.json(req.body.itemId);
});
