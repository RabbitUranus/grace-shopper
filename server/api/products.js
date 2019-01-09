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
