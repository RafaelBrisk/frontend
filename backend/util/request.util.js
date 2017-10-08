'use strict';

function getParams(body, campos) {
  const params = [];
  for (const campo of campos) {
    const props = campo.body.split('\.');
    let valueBody = body;

    for (const prop of props) {
      if (valueBody) {
        valueBody = valueBody[prop];
      } else {
        break;
      }
    }

    params.push({ prop: campo.name, value: valueBody });
  }
  return params;
}

function validNotNull(notNullProperties, body) {
  const camposNulos = [];
  for (const notNullProp of notNullProperties) {
    const props = notNullProp.split('\.');
    let valueBody = body;

    for (const prop of props) {
      if (valueBody) {
        valueBody = valueBody[prop];
      } else {
        break;
      }
    }

    if (valueBody) {
      camposNulos.push(notNullProp);
    }
  }

  return camposNulos;
}

function getDefaultMensage(camposNulos) {
  let retorno = null;
  if (camposNulos.length) {
    let error = `Esses campos não podem ser nulos: [`;

    let i = 0;
    for (const campo of camposNulos) {
      error += campo;

      if (i !== (camposNulos.length - 1)) {
        error += ', ';
      }

      i++;
    }
    error += ']';

    retorno = error;
  }

  return retorno;
}

const client = require('../config/database');
const app = require('../config/app');

function post(table, properties) {
  let sql = `INSERT INTO ${table}(`;

  let strParametros = '';
  const params = [];
  for (let i = 0; i < properties.length; i++) {
    sql += properties[i].prop;

    strParametros += `$${i + 1}`;
    if (i !== (properties.length - 1)) {
      sql += ', ';
      strParametros += ', ';
    }

    params.push(properties[i].value);
  }

  sql += `)VALUES(${strParametros}) RETURNING id;`;

  return { sql: sql, params: params };
}

function put(table, properties, id) {
  let sql = `UPDATE ${table} SET `;

  const params = [];
  for (let i = 0; i < properties.length; i++) {
    sql += `${properties[i].prop} = $${i + 1}`;
    if (i !== (properties.length - 1)) {
      sql += ', ';
    }

    params.push(properties[i].value);
  }

  sql += ` WHERE id = $${properties.length + 1} RETURNING id;`;
  params.push(id);

  return { sql: sql, params: params };
}

function get(table) {
  const sql = `SELECT * FROM ${table};`;
  return { sql: sql, params: [] };
}

function getOne(table, id) {
  const sql = `SELECT * FROM ${table} WHERE id = $1;`;
  return { sql: sql, params: [id] };
}

function remove(table, id) {
  const sql = `DELETE FROM ${table}  WHERE id = $1;`;
  return { sql: sql, params: [id] };
}

function request(client, sql, params, res) {
  client.query(sql, params, (error, item) => {
    if (error) {
      if (res) {
        res.status(400).json(error);
      }
      console.log(error);
    } else {
      if (res) {
        res.status(200).json(item.rows);
      }
    }
  });
}

const exp = {
  validNotNull: validNotNull,
  getDefaultMensage: getDefaultMensage,
  post: post,
  put: put,
  get: get,
  getOne: getOne,
  remove: remove,
  request: request,
  getParams: getParams
};

module.exports = exp;
