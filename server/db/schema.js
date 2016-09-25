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
    }).then((table) => {
      console.log('Created table users', table);
    });
  }
});

// defines Lawyer table
db.knex.schema.hasTable('lawyers').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('lawyers', (lawyer) => {
      user.increments('id').primary();
      user.string('email', 100).unique();
      user.string('password', 100);
      user.string('firstName', 50);
      user.string('lastName', 50);
      user.string('barNumber', 100);
    }).then((table) => {
      console.log('Created table lawyers', table);
    });
  }
});

db.knex.schema.hasTable('typeOfLaw').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('lawyers', (lawyer) => {
      user.increments('id').primary();
      user.string('law', 100).unique();
    }).then((table) => {
      console.log('Created table typeOfLaw', table);
    });
  }
});


module.exports = db;
