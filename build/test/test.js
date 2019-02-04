'use strict';

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
var should = _chai2.default.should(); /* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

var token = '';
var userId = void 0;
var partyId = void 0;
var officeId = void 0;

_chai2.default.use(_chaiHttp2.default);

var user = {
  email: 'johndoe@yahoo.com',
  firstname: 'john',
  lastname: 'doe',
  othernames: 'james',
  passportUrl: 'passportUrl',
  phoneNumber: 8065968899,
  password: 'secret',
  confirmPassword: 'secret'
};

describe('Users', function () {
  this.timeout(10000);
  before(function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      token = res.body.data[0].token;
      userId = res.body.data[0].user.id;
      done();
    });
  });
  it('Should login a user', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(user).end(function (err, res) {
      (0, _chai.expect)(res.body).to.have.status(200);
      done();
    });
  });
});

describe('Office', function () {
  var office = {
    type: 'Local Government',
    name: 'Vice Counselour'
  };

  it('should add a new office to the database', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/offices/').send(office).set('x-access-token', token).end(function (err, res) {
      officeId = res.body.data[0].office.id;
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });

  it('should get all offices', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/offices/').set('x-access-token', token).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });

  it('should get a single office', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/offices/' + officeId).set('x-access-token', token).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });
});

describe('Parties', function () {
  var party = {
    name: 'APC',
    hqAddress: '123 williams Akins, Lagos, Nigeria',
    logoUrl: 'Image Url 1 goes here'
  };

  it('should add a new party to the database', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/parties/').send(party).set('x-access-token', token).end(function (err, res) {
      partyId = res.body.data[0].party.id;
      (0, _chai.expect)(res.body).to.have.status(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });

  it('should get all parties', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/parties/').set('x-access-token', token).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });

  it('should get a single party', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/parties/' + partyId).set('x-access-token', token).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });

  it('should modify a party name', function (done) {
    _chai2.default.request(_app2.default).patch('/api/v1/parties/' + partyId + '/name').send({ name: 'PDP' }).set('x-access-token', token).end(function (err, res) {
      (0, _chai.expect)(res.body).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });

  it('should delete a single delete', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/parties/' + partyId).set('x-access-token', token).end(function (err, res) {
      (0, _chai.expect)(res.body).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });
});

describe('Candidate', function () {
  this.timeout(10000);
  before(function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/parties/').send({
      name: 'APC',
      hqAddress: '123 williams Akins, Lagos, Nigeria',
      logoUrl: 'imageUrl'
    }).set('x-access-token', token).end(function (err, res) {
      partyId = res.body.data[0].party.id;
      (0, _chai.expect)(res.body).to.have.status(201);
      (0, _chai.expect)(res.body).to.be.an('object');
    });
    _chai2.default.request(_app2.default).post('/api/v1/offices/').send({
      type: 'Local Government',
      name: 'Vice Counselour'
    }).set('x-access-token', token).end(function (err, res) {
      officeId = res.body.data[0].office.id;
      (0, _chai.expect)(res.body).to.have.status(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });

  it('Register a candidate', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/offices/' + userId + '/register').send({ office: officeId, party: partyId }).set('x-access-token', token).end(function (err, res) {
      (0, _chai.expect)(res.body).to.have.status(201);
      done();
    });
  });
});

describe('Get a non-existing url/page', function () {
  it('Should return a 404 response for unknown routes', function (done) {
    _chai2.default.request(_app2.default).get('/invalid/route').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      done();
    });
  });
});

describe('Hit the welcome route', function () {
  it('Should hit the welcome Route', function (done) {
    _chai2.default.request(_app2.default).get('/').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});

describe('Authentication', function () {
  it('Should return a 403 error response for invalid token', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/offices/').set('x-access-token', 'invalid-token').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(403);
      done();
    });
  });

  it('Should return a 403 error response for missing token', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/offices/').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(403);
      done();
    });
  });
});