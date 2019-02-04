'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _UserValidator = require('../middleware/UserValidator');

var _UserValidator2 = _interopRequireDefault(_UserValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signUp = _UserController2.default.signUp,
    login = _UserController2.default.login;


var userRouter = _express2.default.Router();

userRouter.post('/signup', _UserValidator2.default.SigninValidator, signUp);
userRouter.post('/login', login);

exports.default = userRouter;