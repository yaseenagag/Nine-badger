'use strict';

var _require = require('./setup');

var expect = _require.expect;
var queries = _require.queries;
var commands = _require.commands;


describe('database', function () {

  describe('createUser', function () {
    it('should insert a record into the users table', function () {
      var userAttributes = {
        firstName: 'Mark',
        lastName: 'Zuckerburg',
        email: 'mark@zuckerburg.io',
        phoneNumber: '4151231234',
        address: 'Learners Guild, 9th Street, Oakland, CA',
        password: '123'
      };
      return commands.createUser(userAttributes).then(function (user) {
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

  describe('createService', function () {
    it('should insert a record into the services table', function () {
      var serviceAttributes = {
        title: 'Iphone Screens',
        logoUrl: 'https://avatars0.githubusercontent.com/u/7544733?v=3&s=466',
        description: 'fix iphone screens'
      };
      return commands.createService(serviceAttributes).then(function (service) {
        expect(service.title).to.eql('Iphone Screens');
        expect(service.logoUrl).to.eql('https://avatars0.githubusercontent.com/u/7544733?v=3&s=466');
        expect(service.description).to.eql('fix iphone screens');
        expect(service.id).to.be.a('number');
        expect(service).to.be.a('object');
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

    describe('getUsers', function () {
      it('should return an array of all users', function () {
        return queries.getUsers().then(function (users) {
          expect(users).to.be.a('array');
          expect(users.length).to.eql(2);
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

    describe('getUserById', function () {
      it('should return json by user id', function () {
        return queries.getUserById(1455).then(function (user) {
          expect(user).to.be.a('object');
          expect(user.id).to.eql(1455);
          expect(user.firstName).to.eql('Mark');
          expect(user.lastName).to.eql('Zuckerburg');
          expect(user.email).to.eql('mark@zuckerburg.io');
          expect(user.address).to.eql('Learners Guild, 9th Street, Oakland, CA');
          expect(user.password).to.eql('123');
          expect(user.phoneNumber).to.eql('4151231234');
        });
      });
    });

    describe('updateUser', function () {

      it('should update a user with given attributes', function () {
        var userAttributes = {
          firstName: 'Majid',
          lastName: 'Rahimi',
          email: 'majid@gmail.com',
          phoneNumber: '123456789',
          address: '123, San Francisco, CA',
          password: '098'
        };
        return commands.updateUser(6672, userAttributes).then(function (user) {
          expect(user).to.be.a('object');
          expect(user.id).to.eql(6672);
          expect(user.firstName).to.eql('Majid');
          expect(user.lastName).to.eql('Rahimi');
          expect(user.email).to.eql('majid@gmail.com');
          expect(user.address).to.eql('123, San Francisco, CA');
          expect(user.password).to.eql('098');
          expect(user.phoneNumber).to.eql('123456789');
        });
      });
    });
  });

  context('when there are services in the database', function () {
    beforeEach(function () {
      return Promise.all([commands.createService({
        id: 15,
        title: 'Android Screens',
        logoUrl: 'https://avatars0.githubusercontent.com/u/7544733?v=3&s=466',
        description: 'fix androids'
      }), commands.createService({
        id: 366,
        title: 'Mac Screens',
        logoUrl: 'https://avatars0.githubusercontent.com/u/7544733?v=3&s=466',
        description: 'fix apples'
      })]);
    });

    describe('getAllServices', function () {

      it('should get all services from the services table', function () {
        return queries.getAllServices().then(function (services) {
          expect(services).to.be.an('array');
          expect(services.length).to.eql(2);
          services.forEach(function (service) {
            if (service.id === 15) {
              expect(service).to.be.a('object');
              expect(service.id).to.eql(15);
              expect(service.title).to.eql('Android Screens');
              expect(service.logoUrl).to.eql('https://avatars0.githubusercontent.com/u/7544733?v=3&s=466');
              expect(service.description).to.eql('fix androids');
            } else if (service.id === 366) {
              expect(service).to.be.a('object');
              expect(service.id).to.eql(366);
              expect(service.title).to.eql('Mac Screens');
              expect(service.logoUrl).to.eql('https://avatars0.githubusercontent.com/u/7544733?v=3&s=466');
              expect(service.description).to.eql('fix apples');
            }
          });
        });
      });
    });
  });
});