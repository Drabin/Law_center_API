const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'LawCenter',
    charset: 'utf8',
  },
});

// create connection
const db = require('bookshelf')(knex);

db.plugin('registry');

// defines User table
db.knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('users', (user) => {
      user.increments('id').primary();
      user.string('email', 100).unique();
      user.string('password', 100);
      user.string('firstName', 30);
      user.string('LastName', 25);
    }).then((table) => {
      console.log('Created table users', table);
    });
  }
});

module.exports = db;
