const router = require('express').Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, WEB_CLIENT } = require('./config');
const { loginSocialCallback } = require('./OAuth');
const { log } = require('./util');

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get('/auth/google', passport.authenticate('google'))
router.get('/auth/google/callback',
  (req, res, next) => {
    log('i am running in here');

    next()
  },
  passport.authenticate('google'),
  async (req, res) => {
    log('here again');
    log('req.session', req.session);

    const accessToken = 'at-token'
    const refreshToken = 'rt-token'

    try {
      const redirectTo = await loginSocialCallback({
        accessToken,
        refreshToken,
        callback: WEB_CLIENT.LOCAL, 
      })
      return res.redirect(redirectTo)
    } catch (err) {
      log(err);
      return res.redirect(`http://localhost:3000/error=${err.message}`)
    }
  }
)
passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  // Scope: https://developers.google.com/identity/protocols/oauth2/scopes#adexchangesellerv2.0 | Find: /userinfo.<scope-value>
  scope: ['profile', 'email', 'openid'],
}, function (_v1, _v2, profile, done) {
  log('profile', profile)
  done(null, profile)
}))

module.exports = router
