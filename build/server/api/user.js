'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('../database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

router.get('/', function (request, response, next) {
  response.send("home Page");
});

router.get('/freeSlots/:serviceId', function (request, response, next) {
  var serviceId = request.params.serviceId;
  _database.queries.getFreeSlotsByServiceId(serviceId).then(function (freeSlots) {
    response.json(freeSlots);
  });
});

router.get('/services', function (request, response, next) {
  _database.queries.getAllServices().then(function (services) {
    response.json(services);
  });
});

router.get('/user', function (request, response, next) {
  _database.queries.getUsers().then(function (user) {
    response.json(user);
  });
});

router.post('/user', function (request, response, next) {
  var att = request.body;
  _database.commands.createUser(att).then(function (user) {
    response.json(user);
  });
});

router.get('/user/:id', function (request, response, next) {
  var userId = request.params.id;
  _database.queries.getUserById(userId).then(function (user) {
    if (user) {
      response.json(user);
    } else {
      response.status(404).json(null);
    }
  });
});

exports.default = router;