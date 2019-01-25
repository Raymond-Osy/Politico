import express from 'express';
import PartyController from '../controllers/PartyController';

const {
  getAllParties, createParty
} = PartyController;

const partyRouter = express.Router();

partyRouter.get('/', getAllParties);
partyRouter.post('/', createParty);

export default partyRouter;
