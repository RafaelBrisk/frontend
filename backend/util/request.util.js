'use strict';

const client = require('../config/database');
const app = require('../config/app');

function post(url, table, properties) {
  app.post(url, (req, res) => {
    for (const prop of properties) {
      if (prop === 'id') {
        const index = properties.indexOf(prop);
        properties.splice(index, 1);
        break;
      }
    }

    let sql = 'INSERT INTO ';
    sql += table;
    sql += '(';

    let strParametros = '';
    const parametros = [];
    for (let i = 0; i < properties.length; i++) {
      sql += properties[i];

      strParametros += '$';
      strParametros += (i + 1);
      if (i !== (properties.length - 1)) {
        sql += ', ';
        strParametros += ', ';
      }

      parametros.push(req.body[properties[i]]);
    }

    sql += ')VALUES(';
    sql += strParametros;
    sql += ');';

    client.query(sql, parametros, (error, item) => {
      if (error) {
        res.status(400).json(error);
        console.log(error);
      } else {
        res.status(201).json(item.rows);
      }
    });
  });
}

function put(url, table, properties) {
  app.put(url, (req, res) => {

    let sql = 'UPDATE ';
    sql += table;
    sql += ' SET ';

    const parametros = [];
    for (let i = 0; i < properties.length; i++) {
      sql += properties[i];
      sql += ' = $';
      sql += (i + 1);
      if (i !== (properties.length - 1)) {
        sql += ', ';
      }

      parametros.push(req.body[properties[i]]);
    }

    sql += ' WHERE id = $';
    sql += properties.length + 1;
    sql += ';';
    parametros.push(req.body['id']);

    client.query(sql, parametros, (error, item) => {
      if (error) {
        res.status(400).json(error);
        console.log(error);
      } else {
        res.status(200).json(item.rows);
      }
    });
  });
}

function getAll(url, table) {
  app.get(url, (req, res) => {

    let sql = 'SELECT * FROM ';
    sql += table;
    sql += ';';

    client.query(sql, [], (error, item) => {
      if (error) {
        res.status(400).json(error);
        console.log(error);
      } else {
        res.status(200).json(item.rows);
      }
    });
  });
}

function getOne(url, table) {
  app.get(url, (req, res) => {

    let sql = 'SELECT * FROM ';
    sql += table;
    sql += ' WHERE id = $1;';

    const id = req.params.id;

    client.query(sql, [id], (error, item) => {
      if (error) {
        res.status(400).json(error);
        console.log(error);
      } else {
        res.status(200).json(item.rows);
      }
    });
  });
}

function remove(url, table) {
  app.delete(url, (req, res) => {

    let sql = 'DELETE FROM ';
    sql += table;
    sql += ' WHERE id = $1;';

    const id = req.params.id;

    client.query(sql, [id], (error, item) => {
      if (error) {
        res.status(400).json(error);
        console.log(error);
      } else {
        res.status(200).json(item.rows);
      }
    });
  });
}

function createEndpoints(url, tableName, properties) {
  post(url, tableName, properties);
  put(url, tableName, properties);
  getAll(url, tableName);
  getOne(url + '/:id', tableName);
  remove(url + '/:id', tableName);
}

const exp = { createEndpoints: createEndpoints };

module.exports = exp;
