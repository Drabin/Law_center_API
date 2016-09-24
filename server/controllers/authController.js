const jwt = require('jwt-simple');
const config = require('../config/config.js');
const User = require('../db/models/user.js');

// creates token for authed user  
function tokenForUser(user) {
  console.log(user);
  const timeStamp = new Date().getTime();
  console.log(user.id);
  return jwt.encode({ 
    sub: user,
    iat: timeStamp,
    }, config.secret);
}

module.exports = {
  
  // checks to see if user already exists if not creates user 
  // and sends back a token to user 
  signup: function(req, res, next) {
    const userObj = req.body;
    if(!userObj.email || !userObj.password) {
      return res.status(422).send({error: 'You must provide a email and password'})
    }
    User.where('email', userObj.email).fetch().then((user) => {
      if(user) {
        res.send({error: 'Email is in use'});        
      } else {
        new User(userObj).save()
        .then((created) => {
          res.json({token: tokenForUser(created.attributes.id)});
        })
        .catch((err) => {
          console.error(err);
        });      
      }
    })
  },

  login: function(req, res, next) {
    res.send({ token: tokenForUser(req.user) })
  }
  



}