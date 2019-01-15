const router = require('express').Router();
const {User, Order} = require('../db/models');
module.exports = router;

// POST add item to cart
router.post('/:userId/orders', async (req, res, next) => {
  console.log('in router', req.params, req.body);
  try {
    //   //TODO: discuss: does this need to be validated somehow? the worst that could happen is someone adds an item to another person's cart, or they add an item that does not exist. Neither one is particularly dangerous

    const [order, wasCreated] = await Order.findOrCreate({
      where: {userId: req.params.userId},
      defaults: {
        chargeId: 'Not Charged',
        isCart: true,
        total: 0,
        items: [req.body.itemId]
      }
    });
    //   //if the order already existed the item needs to be added to cart
    //   if(!wasCreated){
    //     const [numberOfAffectedRows, affectedRows] = await Order.update({
    //       items: [...order.items, req.body.itemId]
    //     }, {
    //       where: {id: order.id},
    //       returning: true, // needed for affectedRows to be populated
    //     });
    console.log(wasCreated);
    //   }
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// GET api/users/
// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       attributes: ['id', 'email']
//     });
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// });
