const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users');


module.exports = function (passport) {


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });


  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {

      User.findOne({email: email}, (err, user) => {
        if (err)
          return done(err);
        if (user) {
          return done(null, false, 'This email is already using');
        }
        if (!req.user) {
          const newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);

          newUser.save(function (err) {
            if (err)
              throw err;
            return done(null, newUser);
          })
        } else {
          const user = req.user;
          user.email = email;
          user.password = user.generateHash(password);

          user.save(function (err) {
            if (err)
              throw err;
            return done(null, user);
          })
        }
      })

    }));


  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      process.nextTick(function () {
        User.findOne({email: email}, (err, user) => {
          if (err)
            return done(err);
          if (!user)
            return done(null, false, 'Incorrect details');
          if (!user.validPassword(password)) {
            return done(null, false, 'Incorrect password');
          }
          if (!user.isActivate) {
            return done(null, false, 'Please verify you account');
          }
          return done(null, user);
        });
      });
    }
  ));

};
