const jwt = require('jwt-simple');
const config = require('../config/config.js');
const User = require('../db/models/user.js');
const Lawyer = require('../db/models/lawyer.js')

// creates token for authed user  
function tokenForUser(user, type) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ 
    sub: user,
    kind: type,
    iat: timeStamp,
    }, config.secret);
}

module.exports = {  
  // checks to see if user/lawyer already exists if not creates user/lawyer 
  // and sends back a token to user/lawyer 
  signup: function(req, res, next) {
    let Model; let type;
   // checks to see what type of signup it is 
    if (req.body.type === 'user') {
      Model = User;
      type = 'user';
    } else {
      Model = Lawyer;
      type = 'lawyer';
    }
    delete req.body.type;
    const userObj = req.body
    if(!userObj.email || !userObj.password) {
      return res.status(422).send({error: 'You must provide a email and password'})
    }
    Model.where('email', userObj.email).fetch().then((user) => {
      if(user) {
        res.status(422).send({error: 'Email is in use'});        
      } else {
        new Model(userObj).save()
        .then((created) => {
          res.json({token: tokenForUser(created.attributes.id, type)});
        })
        .catch((err) => {
          console.error(err);
          res.status(422).send({error: "something went wrong"})
        });      
      }
    })
  },

  login: function(req, res, next) {
    console.log(req.user);
    res.send({ token: tokenForUser(req.user.id) })
  }
  



}