const db = require('../schema');

const Lawyer = db.Model.extend({
  
  tableName: 'lawyers',

    // when user is created calls function to hash password
  initialize: function () {
    this.on('creating', this.hashPassword);
  },

  // compares user password to password that was provided
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), (err, isMatch) => {
      if(err) { return callback(err) };
      callback(null, isMatch);
    });
  },

  // takes password and hashs it 
  hashPassword: function () {
    const cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function (hash) {
        this.set('password', hash);
      });
  },

});

module.exports = Lawyer;
