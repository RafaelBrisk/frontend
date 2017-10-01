'use strict';
const app = require('./config/app');
const services = require('./services/services');

app.listen(3000, () => {
  console.log('Servidor iniciado.');
  services();
});
