'use strict';

const app = require('../config/app');
const util = require('../util/request.util');
const client = require('../config/database');
const lancheIngrediente = require('./lanche-ingrediente.service');

const notNullValues = ['nome', 'valor'];
const campos = [
  { name: 'nome', body: 'nome' },
  { name: 'valor', body: 'valor' }
];
const baseUrl = '/api/lanche';
const tableName = 'lanche';

function post(body, res) {
  // const camposNulos = util.getDefaultMensage(util.validNotNull(notNullValues, body));
  // if (camposNulos) {
  //   res.status(400).json(camposNulos);
  // }

  const params = util.getParams(body, campos);

  const request = util.post(tableName, params);

  client.query(request.sql, request.params, (error, item) => {
    if (error) {
      res.status(400).json(error);
      console.log(error);
    } else {
      for (const ingre of body.ingredientes) {
        ingre.lanche = { id: item.rows[0].id };
        lancheIngrediente.post(ingre, null);
      }

      res.status(200).json(item.rows);
    }
  });
}

function put(body, res) {
  const camposNulos = util.getDefaultMensage(util.validNotNull([...notNullValues, 'id'], body));
  if (camposNulos) {
    res.status(400).json(camposNulos);
  }

  const params = util.getParams(body, campos);

  const request = util.put(tableName, params, body.id);

  util.request(client, request.sql, request.params, res);
}

function get(res) {
  const request = util.get(tableName);

  util.request(client, request.sql, request.params, res);
}

function getOne(params, res) {
  // const camposNulos = util.getDefaultMensage(util.validNotNull(['id'], params));
  // if (camposNulos) {
  //   res.status(400).json(camposNulos);
  // }

  const request = util.getOne(tableName, params.id);

  util.request(client, request.sql, request.params, res);
}

function remove(params, res) {
  const camposNulos = util.getDefaultMensage(util.validNotNull(['id'], params));
  if (camposNulos) {
    res.status(400).json(camposNulos);
  }

  const request = util.remove(tableName, params.id);

  util.request(client, request.sql, request.params, res);
}

function start() {
  console.log('Lanche up.');
  app.post(baseUrl, (req, res) => post(req.body, res));
  app.put(baseUrl, (req, res) => put(req.body, res));
  app.get(baseUrl, (req, res) => get(res));
  app.get(`${baseUrl}/:id`, (req, res) => getOne(req.params, res));
  app.delete(`${baseUrl}/:id`, (req, res) => remove(req.params, res));
}

const exp = {
  start: start,
  post: post,
  put: put,
  get: get,
  getOne: getOne,
  remove: remove
}

module.exports = exp;
