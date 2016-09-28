
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
      user.string('name', 50);
    }).then((table) => {
      console.log('Created table users', table);
    });
  }
});

// defines Lawyer table
db.knex.schema.hasTable('lawyers').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('lawyers', (lawyer) => {
      lawyer.increments('id').primary();
      lawyer.string('email', 100).unique();
      lawyer.string('password', 100);
      lawyer.string('first_name', 50);
      lawyer.string('last_name', 50);
      lawyer.string('bar_number', 100);
    }).then((table) => {
      console.log('Created table lawyers', table);
    });
  }
});

// defines types of law table
db.knex.schema.hasTable('types_of_law').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('types_of_law', (type) => {
      type.increments('id').primary();
      type.string('law', 100).unique();
    }).then((table) => {
      console.log('Created table types_of_law', table);
    });
  }
});

// defines join table types of law and lawyers
db.knex.schema.hasTable('types_law_lawyer').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('types_law_lawyer', (join) => {
      join.increments('id').primary();
      join.interger('law', 10);
      join.interger('lawyer', 100);
    }).then((table) => {
      console.log('Created table types_law_lawyer', table);
    });
  }
});


module.exports = db;
