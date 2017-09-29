'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

function getClient() {
  return new pg.Client({
    host: 'localhost',
    port: 5432,
    database: 'cadapets',
    user: 'postgres',
    password: 'postgres'
  });
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('.'));

app.post('/api/pet', (req, res) => {
  const nome = req.body.nome;
  const tipoPet = req.body.tipoPet;
  const idade = req.body.idade;
  const raca = req.body.raca;
  const client = getClient();
  client.connect();
  client.query(
    'INSERT INTO pet(nome, tipoPet, idade, raca)values($1, $2, $3, $4);',
    [nome, tipoPet, idade, raca],
    (err, item) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(item.rows);
      }
      client.end();
    });
});

app.put('/api/pet', (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const tipoPet = req.body.tipoPet;
  const idade = req.body.idade;
  const raca = req.body.raca;
  const client = getClient();
  client.connect();
  client.query(
    'UPDATE pet set nome = $1, set tipoPet = $2, set idade = $3, set raca= $4 WHERE id = $5;',
    [nome, tipoPet, idade, raca, id],
    (err, item) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(item.rows);
      }
      client.end();
    });
});

app.get('/api/pet', (req, res) => {
  const client = getClient();
  client.connect();
  client.query('SELECT * FROM pet;', [], (err, item) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(item.rows);
    }
    client.end();
  });
});

app.get('api/pet/:id', (req, res) => {
  const id = req.params.id;
  const client = getClient();
  client.connect();
  client.query('SELECT * FROM pet WHERE id = $1;', [id], (err, item) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(item.rows);
    }
    client.end();
  });
});

app.delete('/api/pet/:id', (req, res) => {
  const id = req.params.id;
  const client = getClient();
  client.connect();
  client.query('DELETE pet WHERE id = $1', [id], (err, item) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json();
    }
    client.end();
  })
});

app.listen(3000, () => {
  console.log('Servidor iniciado.');
});
