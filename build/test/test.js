'use strict';

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Get a non-existing url/page', function () {
  it('Should return a 404 response for unknown routes', function (done) {
    _chai2.default.request(_app2.default).get('/invalid/route').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      done();
    });
  });
});

/*
* Test for all the routes under /PARTIES
*/
describe('All requests to /Parties', function () {
  describe('/GET/ party', function () {
    it('Should return response 200', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/parties').end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res).to.be.an('object');
        done();
      });
    });
  });

  describe('/GET/:id party', function () {
    it('should return response 200', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/parties/1').end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res).to.be.an('object');
        done();
      });
    });
  });

  describe('/POST party', function () {
    var party = {
      id: 1,
      name: 'APC',
      hqAddress: '123 williams Akins, Lagos, Nigeria',
      logoUrl: 'Image Url 1 goes here'
    };
    it('should add a new party to the database', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/parties/').send(party).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });
  });

  describe('/DELETE/:id party', function () {
    it('should add a new party to the database', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/parties/1').end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });
  });

  describe('/PATCH/:id/name', function () {
    it('should edit the name for a particular party', function (done) {
      _chai2.default.request(_app2.default).patch('/api/v1/parties/3/name').send({ name: 'new name' }).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res).to.be.an('object');
        done();
      });
    });
  });
});

/*
* Test for all the routes under /OFFICES
*/
describe('All requests to /offices', function () {
  describe('/GET/ office', function () {
    it('Should return response 200', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/offices').end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res).to.be.an('object');
        done();
      });
    });
  });

  describe('/GET/:id office', function () {
    it('should return response 200', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/offices/1').end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res).to.be.an('object');
        done();
      });
    });
  });

  describe('/POST office', function () {
    var office = {
      id: 1,
      type: 'Local Government',
      name: 'Vice Counselour'
    };
    it('should add a new office to the database', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/offices/').send(office).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });
  });
});