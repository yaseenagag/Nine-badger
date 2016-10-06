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
      attributes.availability = JSON.stringify(availability);
      return Promise.all([knex.table('agents').insert(attributes).returning('id')]).then(function (agentId) {
        var agent_id = agentId[0][0];

        var inserts = services.map(function (service_id) {
          return knex.table('agent_services').insert({ agent_id: agent_id, service_id: service_id });
        });

        return Promise.all(inserts);
      });
    },
    createAgentService: function createAgentService(agentId, serviceId) {
      return knex.table('agent_services').insert({ agent_id: agentId, service_id: serviceId }).returning('*');
    }
  };
};

var firstRecord = function firstRecord(records) {
  return records[0];
};