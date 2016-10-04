'use strict';

process.env.NODE_ENV = 'test';
process.env.PORT = process.env.PORT || '4000';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server');

var _require = require('../server/database');

var knex = _require.knex;
var queries = _require.queries;
var commands = _require.commands;


chai.use(chaiHttp);

// request('GET', '/api/users/12').then(response)
var request = function request(method, url, postBody) {
  method = method.toLowerCase();
  return new Promise(function (resolve, reject) {
    var req = chai.request(server)[method](url);
    if (method === 'post' && postBody) req = req.send(postBody);
    req.end(function (error, response) {
      if (error && error.status >= 500) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

beforeEach(function () {
  return knex.migrate.latest().then(function () {
    return knex.truncateAllTables();
  });
});

module.exports = {
  chai: chai,
  expect: expect,
  request: request,
  server: server,
  knex: knex,
  queries: queries,
  commands: commands
};