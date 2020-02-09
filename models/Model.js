const { Model } = require('objection');
const Knex = require('knex');
const config = require('../config');

const knex = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE
  }
});

Model.knex(knex);

module.exports = Model;
