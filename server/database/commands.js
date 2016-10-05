export default (knex, queries) => ({

  createUser(attributes) {
    return knex
      .table('users')
      .insert(attributes)
      .returning('*')
      .then(firstRecord)
  },

  updateUser(userId, attributes) {
    return knex
      .table('users')
      .where('id', userId)
      .update(attributes)
      .returning('*')
      .then(firstRecord)

  }

});

const firstRecord = records => records[0];
