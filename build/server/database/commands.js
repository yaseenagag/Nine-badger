'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (knex, queries) {
  return {
    createUser: function createUser(attributes) {
      return knex.table('users').insert(attributes).returning('*').then(firstRecord);
    },
    updateUser: function updateUser(userId, attributes) {
      return knex.table('users').where('id', userId).update(attributes).returning('*').then(firstRecord);
    },
    createService: function createService(attributes) {
      return knex.table('services').insert(attributes).returning('*').then(firstRecord);
    },
    createAgent: function createAgent(attributes, availability, services) {
      return Promise.all([knex.table('agents').insert(attributes).returning('id')]).then(function (agentId) {
        agentId = agentId[0][0];
        return knex.table('agents').where({ id: agentId }).update({ availability: JSON.stringify(availability) }).returning('*');
      }).then(firstRecord);
    }
  };
};

var firstRecord = function firstRecord(records) {
  return records[0];
};