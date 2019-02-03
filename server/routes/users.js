import express from 'express';
import UserController from '../controllers/UserController';
import UserValidator from '../middleware/UserValidator';

const {
  signUp, login
} = UserController;


const userRouter = express.Router();

userRouter.post('/signup', UserValidator.SigninValidator, signUp);
userRouter.post('/login', login);

export default userRouter;
