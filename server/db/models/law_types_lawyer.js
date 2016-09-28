const db = require('../schema');

const TypesLawyer = db.Model.extend({
  
  tableName:'types_law_lawyer'

});

module.exports = TypesLawyer;