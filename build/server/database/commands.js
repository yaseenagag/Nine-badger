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
    }
  };
};

var firstRecord = function firstRecord(records) {
  return records[0];
};