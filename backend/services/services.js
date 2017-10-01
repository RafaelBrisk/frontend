'use strict';
const request = require('../util/request.util');
const Pet = require('../domain/pet');

function startServices() {
  request.createEndpoints('/api/pet', 'pet', Object.getOwnPropertyNames(new Pet));
}

module.exports = startServices;
