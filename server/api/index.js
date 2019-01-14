const router = require('express').Router();
const passport = require('passport');
module.exports = router;

router.use(
  '/78FDSFTJ5WDQHYNNTAQ2Q3V4QGP52E8FRHP5EYNC3TDN6EQHEVAL5SE353CWUS5V',
  // passport.authenticate('local', {session: false}),
  require('./users')
);
router.use(
  '/products',
  // passport.authenticate('local', {session: false}),
  require('./products')
);
router.use(
  '/S7MC5KMZNEPZNCZS6QZBGEDT4HU2N7MZ6NKSBFK8NH85DF8X4SW46YJ6RHEZ4VAE',
  // passport.authenticate('local', {session: false}),
  require('./orders')
);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
