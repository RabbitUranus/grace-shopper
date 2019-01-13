const router = require('express').Router();
const passport = require('passport');
module.exports = router;

router.use(
  '/users',
  // passport.authenticate('local', {session: false}),
  require('./users')
);
router.use(
  '/products',
  // passport.authenticate('local', {session: false}),
  require('./products')
);
router.use(
  '/orders',
  // passport.authenticate('local', {session: false}),
  require('./orders')
);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
