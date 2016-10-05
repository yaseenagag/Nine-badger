const { expect, queries, commands } = require('./setup')

describe('database', () => {

  describe('createUser', () => {
    it('should insert a record into the users table', () => {
      const userAttributes = {
        firstName: 'Mark',
        lastName: 'Zuckerburg',
        email: 'mark@zuckerburg.io',
        phoneNumber: '4151231234',
        address: 'Learners Guild, 9th Street, Oakland, CA',
        password: '123'
      }
      return commands.createUser(userAttributes)
        .then(user => {
          expect(user).to.be.a('object')
          expect(user.id).to.be.a('number')
          expect(user.firstName).to.eql('Mark')
          expect(user.lastName).to.eql('Zuckerburg')
          expect(user.email).to.eql('mark@zuckerburg.io')
          expect(user.address).to.eql('Learners Guild, 9th Street, Oakland, CA')
          expect(user.password).to.eql('123')
          expect(user.phoneNumber).to.eql('4151231234')
      })
    })
  })

  context('when there are users in the database', () => {
    beforeEach( () => {
      return Promise.all([
        commands.createUser({
          id: 1455,
          firstName: 'Mark',
          lastName: 'Zuckerburg',
          email: 'mark@zuckerburg.io',
          phoneNumber: '4151231234',
          address: 'Learners Guild, 9th Street, Oakland, CA',
          password: '123'
        }),
        commands.createUser({
          id: 6672,
          firstName: 'Larry',
          lastName: 'Harvey',
          email: 'larry@harvey.to',
          phoneNumber: '8151231234',
          address: '9th Street, Oakland, CA',
          password: '456'        
        })
      ])
    })

    describe('getUsers', () => {
      it('should return an array of all users', () => {
        return queries.getUsers().then( users => {
          expect(users).to.be.a('array')
          expect(users.length).to.eql(2)
          users.forEach(user => {
            if (user.id === 1455){
              expect(user).to.be.a('object')
              expect(user.id).to.eql(1455)
              expect(user.firstName).to.eql('Mark')
              expect(user.lastName).to.eql('Zuckerburg')
              expect(user.email).to.eql('mark@zuckerburg.io')
              expect(user.address).to.eql('Learners Guild, 9th Street, Oakland, CA')
              expect(user.password).to.eql('123')
              expect(user.phoneNumber).to.eql('4151231234')
            }else if (user.id === 6672){
              expect(user).to.be.a('object')
              expect(user.id).to.eql(6672)
              expect(user.firstName).to.eql('Larry')
              expect(user.lastName).to.eql('Harvey')
              expect(user.email).to.eql('larry@harvey.to')
              expect(user.address).to.eql('9th Street, Oakland, CA')
              expect(user.password).to.eql('456')
              expect(user.phoneNumber).to.eql('8151231234')
            }else{
              throw new Error('unexpected user record')
            }
          })
        })
      })
    })

    describe('getUserById', () => {
      it('should return json by user id', () => {
        return queries.getUserById(1455).then( user => {
          expect(user).to.be.a('object')
          expect(user.id).to.eql(1455)
          expect(user.firstName).to.eql('Mark')
          expect(user.lastName).to.eql('Zuckerburg')
          expect(user.email).to.eql('mark@zuckerburg.io')
          expect(user.address).to.eql('Learners Guild, 9th Street, Oakland, CA')
          expect(user.password).to.eql('123')
          expect(user.phoneNumber).to.eql('4151231234')
        })
      })
    })

    describe('updateUser', () => {

      it('should update a user with given attributes', () => {
        const userAttributes = {
          firstName: 'Majid',
          lastName: 'Rahimi',
          email: 'majid@gmail.com',
          phoneNumber: '123456789',
          address: '123, San Francisco, CA',
          password: '098' 
        }
        return commands.updateUser(6672, userAttributes).then( user => {
          expect(user).to.be.a('object')
          expect(user.id).to.eql(6672)
          expect(user.firstName).to.eql('Majid')
          expect(user.lastName).to.eql('Rahimi')
          expect(user.email).to.eql('majid@gmail.com')
          expect(user.address).to.eql('123, San Francisco, CA')
          expect(user.password).to.eql('098')
          expect(user.phoneNumber).to.eql('123456789')
        })
      })

    })

  }) // dummy data users


})
