import express from 'express';
import PartyController from '../controllers/PartyController';

const {
  getAllParties, getAPartyById, createParty
} = PartyController;

const partyRouter = express.Router();

partyRouter.get('/', getAllParties);
partyRouter.get('/:id', getAPartyById);
partyRouter.post('/', createParty);

export default partyRouter;
