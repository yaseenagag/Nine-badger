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

  },

  createService(attributes) {
    return knex
      .table('services')
      .insert(attributes)
      .returning('*')
      .then(firstRecord)
  },

  createAgent(attributes, availability, services) {
    return Promise.all([
      knex.table('agents')
          .insert(attributes)
          .returning('id')
      ])
      .then(agentId => {
        agentId = agentId[0][0]
        return knex.table('agents')
        .where({id : agentId})
        .update({availability: JSON.stringify(availability)})
        .returning('*')
      })
      .then(firstRecord)
  }


})

const firstRecord = records => records[0];
