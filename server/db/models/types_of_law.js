const db = require('../schema');

const TypesOfLaw = db.Model.extend({
  
  tableName: 'types_of_law',

});

module.exports = TypesOfLaw;
