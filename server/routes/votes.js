import express from 'express';
import VoteController from '../controllers/VoteController';
import Authenticator from '../middleware/authenticator';
import VoteValidator from '../middleware/VoteValidator';


const {
  createVote,
} = VoteController;


const voteRouter = express.Router();

voteRouter.post('/', Authenticator.isAuthenticated, VoteValidator.createVoteValidator, createVote);

export default voteRouter;
