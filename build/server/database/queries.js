'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    }
  };
};