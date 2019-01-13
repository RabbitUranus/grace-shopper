const router = require('express').Router();
const User = require('../db/models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = router;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async function(username, password, done) {
      await User.findOne({username: username}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Incorrect username.'});
        }
        if (!user.correctPassword(password)) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
      });
    }
  )
);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// router.post('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({where: {email: req.body.email}});
//     if (!user) {
//       console.log('No such user found:', req.body.email);
//       res.status(401).send('Wrong username and/or password');
//     } else if (!user.correctPassword(req.body.password)) {
//       console.log('Incorrect password for user:', req.body.email);
//       res.status(401).send('Wrong username and/or password');
//     } else {
//       req.login(user, err => (err ? next(err) : res.json(user)));
//     }
//   } catch (err) {
//     next(err);
//   }
// });

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
