const router = require('express').Router();
const {Item} = require('../db/models');
module.exports = router;

// GET api/products/
router.get('/', async (req, res, next) => {
  try {
    const products = await Item.findAll({where: req.query});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET api/products/tag/:id
// router.get('/tag/:id', async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.send(product);
//   } catch (err) {
//     next(err);
//   }
// });

// GET api/products/style/:type
// router.get('/style/:type', async (req, res, next) => {
//   try {
//     const type = req.params.type;
//     const products = await Product.findAll({
//       where: {type}
//     });
//     res.send(products);
//   } catch (err) {
//     next(err);
//   }
// });

// GET api/products/style/:color
// router.get('/style/:color', async (req, res, next) => {
//   try {
//     const color = req.params.color;
//     const products = await Product.findAll({
//       where: {color}
//     });
//     res.send(products);
//   } catch (err) {
//     next(err);
//   }
// });
