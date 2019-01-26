import express from 'express';
import PartyController from '../controllers/PartyController';

const {
  getAllParties, getAPartyById, createParty, deleteParty
} = PartyController;

const partyRouter = express.Router();

partyRouter.get('/', getAllParties);
partyRouter.get('/:id', getAPartyById);
partyRouter.post('/', createParty);
partyRouter.delete('/:id', deleteParty);

export default partyRouter;
