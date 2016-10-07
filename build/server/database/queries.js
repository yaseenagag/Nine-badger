'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var moment = require('moment');
var tz = require('moment-timezone');

exports.default = function (knex) {
  return {
    getUsers: function getUsers() {
      return knex.table('users').select('*');
    },
    getUserById: function getUserById(userId) {
      return knex.table('users').where('id', userId).first('*');
    },
    getAllServices: function getAllServices() {
      return knex.table('services').select('*');
    },
    getFreeSlotsByServiceId: function getFreeSlotsByServiceId(serviceId) {
      return Promise.all([knex.from('agents').join('agent_services', { 'agent_services.agent_id': 'agents.id' }).where('agent_services.service_id', serviceId)]).then(function (agents) {
        console.log("agents", agents);
        return generateFreeSlots(agents);
      });
    },
    getAgents: function getAgents() {
      return knex.table('agents').select('*');
    },
    getAgentServices: function getAgentServices() {
      return knex.table('agent_services').select('*');
    }
  };
};

var generateFreeSlots = function generateFreeSlots(agents) {
  var week = { monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = agents[0][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var agent = _step.value;

      var days = JSON.parse(agent.availability);
      days.map(function (day) {
        var start = parseInt(day.hours[0].start.slice(0, 2));
        var end = parseInt(day.hours[0].end.slice(0, 2));
        while (start < end) {
          var temp = day.day;
          week[temp].push([start, start + 1]);
          start++;
        }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return week;
};

// let current = moment()
// console.log(current.tz("America/Los_Angeles").format('YYYY-MM-DDTHH:mm'))