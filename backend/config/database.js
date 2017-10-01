'use strict';

const pg = require('pg');

const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  database: 'cadapets',
  user: 'postgres',
  password: 'postgres'
});

client.connect();

module.exports = client;
