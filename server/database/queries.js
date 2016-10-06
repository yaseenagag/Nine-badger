export default (knex) => ({

  getUsers() {
    return knex
      .table('users')
      .select('*')
  },

  getUserById(userId) {
    return knex
      .table('users')
      .where('id', userId)
      .first('*')
  },

  getAllServices() {
    return knex
      .table('services')
      .select('*')
  },

  getFreeSlotsByServiceId(serviceId) {
    return knex 
      .table('agents')
      
  },

  getAgents() {
    return knex
      .table('agents')
      .select('*')
  }


})
