'use strict';
const app = require('./config/app');
const lanche = require('./services/lanche.service');
const ingrediente = require('./services/ingrediente.service');
const lancheIngrediente = require('./services/lanche-ingrediente.service');
const unidadeMedida = require('./services/unidade-medida.service');

app.listen(3000, () => {
  console.log('Servidor iniciado.');
  lanche.start();
  ingrediente.start();
  lancheIngrediente.start();
  unidadeMedida.start();
});
