const authController = require('./controllers/authController.js');
const passportService = require('./services/passport.js');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  
  app.get('/', requireAuth, function(req, res) {
    res.send({ message:'that test doe' });
  });
  // signup and login routes 
  app.post('/signup', authController.signup);
  app.post('/login', requireLogin, authController.login ); 
}
