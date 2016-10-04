'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commands = exports.queries = exports.knex = undefined;

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// paths are relative to build/server/database/index.js
require('../../../config/environment');
var config = require('../../../knexfile')[process.env.NODE_ENV];
var knex = (0, _knex2.default)(config);
var queries = (0, _queries2.default)(knex);
var commands = (0, _commands2.default)(knex, queries);

knex.truncateAllTables = function () {
  return Promise.all([this.truncate('users'), this.truncate('services'), this.truncate('agents'), this.truncate('agent_services'), this.truncate('appointments')]);
};

exports.knex = knex;
exports.queries = queries;
exports.commands = commands;