'use strict';

var _require = require('./setup');

var chai = _require.chai;
var expect = _require.expect;
var request = _require.request;
var server = _require.server;
var commands = _require.commands;


describe('API', function () {

  describe('/api/users', function () {

    describe('POST /user', function () {
      it('should create a user', function () {
        var userAttributes = {
          firstName: 'Mark',
          lastName: 'Zuckerburg',
          email: 'mark@zuckerburg.io',
          phoneNumber: '4151231234',
          address: 'Learners Guild, 9th Street, Oakland, CA',
          password: '123'
        };
        return request('post', '/user', userAttributes).then(function (response) {
          var user = response.body;
          expect(response).to.have.status(200);
          expect(response).to.be.json; // jshint ignore:line
          expect(user).to.be.a('object');
          expect(user.id).to.be.a('number');
          expect(user.firstName).to.eql('Mark');
          expect(user.lastName).to.eql('Zuckerburg');
          expect(user.email).to.eql('mark@zuckerburg.io');
          expect(user.address).to.eql('Learners Guild, 9th Street, Oakland, CA');
          expect(user.password).to.eql('123');
          expect(user.phoneNumber).to.eql('4151231234');
        });
      });
    });

    context('when there are users in the database', function () {
      beforeEach(function () {
        return Promise.all([commands.createUser({
          id: 1455,
          firstName: 'Mark',
          lastName: 'Zuckerburg',
          email: 'mark@zuckerburg.io',
          phoneNumber: '4151231234',
          address: 'Learners Guild, 9th Street, Oakland, CA',
          password: '123'
        }), commands.createUser({
          id: 6672,
          firstName: 'Larry',
          lastName: 'Harvey',
          email: 'larry@harvey.to',
          phoneNumber: '8151231234',
          address: '9th Street, Oakland, CA',
          password: '456'
        })]);
      });

      describe('GET /api/users', function () {

        it('should render a json array of all users', function () {
          return request('get', '/user').then(function (response) {
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.equal(2);
            var users = response.body;
            users.forEach(function (user) {
              if (user.id === 1455) {
                expect(user).to.be.a('object');
                expect(user.id).to.eql(1455);
                expect(user.firstName).to.eql('Mark');
                expect(user.lastName).to.eql('Zuckerburg');
                expect(user.email).to.eql('mark@zuckerburg.io');
                expect(user.address).to.eql('Learners Guild, 9th Street, Oakland, CA');
                expect(user.password).to.eql('123');
                expect(user.phoneNumber).to.eql('4151231234');
              } else if (user.id === 6672) {
                expect(user).to.be.a('object');
                expect(user.id).to.eql(6672);
                expect(user.firstName).to.eql('Larry');
                expect(user.lastName).to.eql('Harvey');
                expect(user.email).to.eql('larry@harvey.to');
                expect(user.address).to.eql('9th Street, Oakland, CA');
                expect(user.password).to.eql('456');
                expect(user.phoneNumber).to.eql('8151231234');
              } else {
                throw new Error('unexpected user record');
              }
            });
          });
        });
      });

      describe('GET /user/:id', function () {
        context('when requesting a user that exists', function () {
          it('should render that user as json', function () {
            return request('get', '/user/6672').then(function (response) {
              var user = response.body;
              expect(response).to.have.status(200);
              expect(response).to.be.json;
              expect(user).to.be.an('object');
              expect(user.id).to.eql(6672);
              expect(user.firstName).to.eql('Larry');
              expect(user.lastName).to.eql('Harvey');
              expect(user.email).to.eql('larry@harvey.to');
              expect(user.address).to.eql('9th Street, Oakland, CA');
              expect(user.password).to.eql('456');
              expect(user.phoneNumber).to.eql('8151231234');
            });
          });
        });
        context('when requesting a user that doesnt exist', function () {
          it('should render nothing status 404', function () {
            return request('get', '/user/55').then(function (response) {
              expect(response).to.have.status(404);
              expect(response).to.be.json;
              expect(response.body).to.eql(null);
            });
          });
        });
      });
    }); // dummy data users
  });
});