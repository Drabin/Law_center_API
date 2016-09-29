const passport = require('passport');
const User = require('../db/models/user.js');
const Lawyer = require('../db/models/lawyer.js');
const config = require('../config/config.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// set up local options
const localOptions = { usernameField: 'email' }

// creates local strategy for authenticating user based on email and password 
const userLocalLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.where('email', email).fetch().then((user) => {
    if(!user) {
      done(null, false);
    }
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }
      user.attributes.kind = 'user';
      return done (null, user.attributes);
    })
  }).catch((err) => {
    console.error(err);
  });
})

// creates local strategy for authenticating lawyer based on email and password 
const lawyerLocalLogin = new LocalStrategy(localOptions, function(email, password, done) {
  Lawyer.where('email', email).fetch().then((lawyer) => {
    if(!lawyer) {
      done(null, false);
    }
    lawyer.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }
      lawyer.attributes.kind = 'lawyer';
      return done (null, lawyer.attributes);
    })
  }).catch((err) => {
    console.error(err);
  });
})


// set up jwt options
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// create jwt strategy for authenticating user based on token 
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) { 
  let Model;
  // checks to see what type of signup it is 
  if (payload.kind === 'user') {
    Model = User;
  } else {
    Model = Lawyer;
  }
  Model.where('id', payload.sub).fetch().then((user) => {
    if(user) {
      done(null, user.attributes);
    } else {
      done(null, false);
    }
  }).catch((err) => {
    console.error(err);
  }); 
});

// tells passport to use these strategies 
passport.use(jwtLogin);
passport.use('user-local', userLocalLogin);
passport.use('lawyer-local', lawyerLocalLogin);



