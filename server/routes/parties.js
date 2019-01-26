import express from 'express';
import PartyController from '../controllers/PartyController';

const {
  getAllParties, getAPartyById, createParty, deleteParty, editParty
} = PartyController;

const partyRouter = express.Router();

partyRouter.get('/', getAllParties);
partyRouter.get('/:id', getAPartyById);
partyRouter.post('/', createParty);
partyRouter.delete('/:id', deleteParty);
partyRouter.patch('/:id/name', editParty);

export default partyRouter;
