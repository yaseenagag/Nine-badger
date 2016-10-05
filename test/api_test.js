const { chai, expect, request, server, commands } = require('./setup')


describe('API', () => {

  describe('/api/users', () => {

    describe('POST /user', () => {
      it('should create a user', () => {
        const userAttributes = {
          firstName: 'Mark',
          lastName: 'Zuckerburg',
          email: 'mark@zuckerburg.io',
          phoneNumber: '4151231234',
          address: 'Learners Guild, 9th Street, Oakland, CA',
          password: '123'
        }
        return request('post', '/user', userAttributes).then(response => {
          const user = response.body
          expect(response).to.have.status(200);
          expect(response).to.be.json; // jshint ignore:line
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
      beforeEach(() => {
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
    })

      describe('GET /api/users', () => {

        it('should render a json array of all users', () => {
          return request('get', '/user').then(response => {
            expect(response).to.have.status(200)
            expect(response).to.be.json
            expect(response.body).to.be.an('array')
            expect(response.body.length).to.equal(2)
            const users = response.body
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

      describe('GET /user/:id', () => {
        context('when requesting a user that exists', () => {
          it('should render that user as json', () => {
            return request('get','/user/6672').then(response => {
              const user = response.body
              expect(response).to.have.status(200);
              expect(response).to.be.json
              expect(user).to.be.an('object');
              expect(user.id).to.eql(6672)
              expect(user.firstName).to.eql('Larry')
              expect(user.lastName).to.eql('Harvey')
              expect(user.email).to.eql('larry@harvey.to')
              expect(user.address).to.eql('9th Street, Oakland, CA')
              expect(user.password).to.eql('456')
              expect(user.phoneNumber).to.eql('8151231234')
            })
          })
        })
        context('when requesting a user that doesnt exist', () => {
          it('should render nothing status 404', () => {
            return request('get','/user/55').then(response => {
              expect(response).to.have.status(404);
              expect(response).to.be.json
              expect(response.body).to.eql(null)
            })
          })
        })
      })

    }) // dummy data users

  })

})
